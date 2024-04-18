from PySide2.QtWidgets import QApplication, QMainWindow, QPushButton,QPlainTextEdit,QMessageBox,QFileDialog,QProgressBar,QTableWidgetItem
from PySide2.QtCore import Signal,QObject  # 导入信号类
from PySide2.QtUiTools import QUiLoader
from PySide2.QtWidgets import QApplication, QWidget, QTableView, QHeaderView, QHBoxLayout
from PySide2.QtCore import QAbstractTableModel, QModelIndex, Qt
from PySide2.QtWebEngineWidgets import QWebEngineView, QWebEnginePage
from collections import defaultdict
from heapq import *

class MySignals(QObject):
    # 定义一种信号，因为有文本框和进度条两个类，此处要四个参数，类型分别是： QPlainTextEdit 、 QProgressBar、字符串和整形数字
    # 调用 emit方法发信号时，传入参数必须是这里指定的参数类型
    # 此处也可分开写两个函数，一个是对应文本框输出路径，一个是给进度条赋值的
    text_print = Signal(QPlainTextEdit,QProgressBar,str,int)

class Stats:

    '''初始化——将按钮与函数建立连接'''
    def __init__(self):
        # 从文件中加载UI定义
        # 从 UI 定义中动态 创建一个相应的窗口对象

        self.ui = QUiLoader().load(r'E:\ProgramVS\code\QTplat\myui.ui')
        self.base_info=['2','08','12',r"E:\SRTP数据"]
        self.edges=0
        self.station=0
        self.ui.edit_change.setText(self.base_info[3])

        self.ms = MySignals()                              #引入信号函数
        self.ms.text_print.connect(self.preact)

        self.ui.bt_sure.clicked.connect(self.info_sure)    #数据处理地址导入控件
        self.ui.bt_input.clicked.connect(self.bt_inputfunc)
        self.ui.bt_total.clicked.connect(self.new_bt_totalfunc)
        self.ui.bt_change.clicked.connect(self.bt_changefunc)
        self.ui.bt_grid.clicked.connect(self.bt_gridfunc)
        self.ui.bt_trip.clicked.connect(self.bt_tripfunc)
        self.ui.bt_m.clicked.connect(self.bt_mfunc)
        self.ui.bt_info.clicked.connect(self.bt_infofunc)
        self.ui.bt_in.clicked.connect(self.bt_infunc)

        self.ui.bt_1to2.clicked.connect(self.bt_1to2func)      #翻页控件
        self.ui.bt_showout.clicked.connect(self.bt_showoutfunc)      #网页控件

        self.ui.rb_gps.clicked.connect(self.rb_gpsfunc)    #数据处理数据查看控件
        self.ui.rb_grid.clicked.connect(self.rb_gridfunc)
        self.ui.rb_trip.clicked.connect(self.rb_tripfunc)
        self.ui.rb_m.clicked.connect(self.rb_mfunc)
        self.ui.rb_ndata.clicked.connect(self.rb_ndatafunc)
        self.ui.rb_mdata.clicked.connect(self.rb_mdatafunc)

        self.ui.bt_alzline.clicked.connect(self.bt_alzlinefunc)
        self.ui.bt_btrline.clicked.connect(self.bt_btrlinefunc)
        self.ui.rb_sta.clicked.connect(self.rb_stafunc)
        self.ui.rb_btrline.clicked.connect(self.rb_btrlinefunc)
        self.ui.rb_evalu.clicked.connect(self.rb_evalufunc)

        self.reset()


    def reset(self):
        self.ui.bt_total.setEnabled(False)
        self.ui.bt_grid.setEnabled(False)
        self.ui.bt_trip.setEnabled(False)
        self.ui.bt_m.setEnabled(False)
        self.ui.edit_grid.setEnabled(False)
        self.ui.edit_trip.setEnabled(False)
        self.ui.edit_m.setEnabled(False)
        self.ui.spinBox_3.setEnabled(False)

    '''基础函数——路径浏览，信息确认'''
    def open_file(self):#打开文件浏览器，返回文件名
        #F=QFileDialog(self.ui)
        #dir_path=F.getExistingDirectory(self,self.ui,"choose directory")#,"choose directory","C:\\Users\\Administrator\\Desktop"
        dir_path=QFileDialog.getOpenFileNames(
            self.ui,             # 父窗口对象
            "选择你要上传的数据", # 标题
            r"d:\\data",        # 起始目录
            "文件类型 (*.csv *.xlsx)" )
        print(dir_path)
        return dir_path
    def info_sure(self):#确认日期、时间信息信息
        '''基本信息导入'''
        day=self.ui.box_day.currentText()
        stime=self.ui.box_stime.currentText()
        etime=self.ui.box_etime.currentText()
        path=self.ui.edit_change.text()
        self.base_info=[day,stime,etime,path]
        print(self.base_info)
        QMessageBox.information(self.ui,'操作成功','基本信息储存成功！\n请继续下一步操作')
    def bt_1to2func(self):
        self.ui.linecreate.setEnabled(True)

    '''路径浏览按钮响应'''
    def bt_inputfunc(self):#GPS数据输入框
        dir_path,type=self.open_file()
        print(dir_path)
        self.ui.edit_input.setPlainText(dir_path[0])
    def bt_changefunc(self):#保存路径浏览按钮
        dir_path=QFileDialog.getExistingDirectory()
        print(dir_path)
        self.ui.edit_change.setText(dir_path)
    def bt_gridfunc(self):#栅格数据路径浏览
        dir_path,type=self.open_file()
        print(dir_path)
        self.ui.edit_grid.setPlainText(dir_path[0])
    def bt_tripfunc(self):#轨迹数据路径浏览
        dir_path,type=self.open_file()
        print(dir_path)
        self.ui.edit_trip.setPlainText(dir_path[0])
    def bt_mfunc(self):#反邻接矩阵数据浏览
        dir_path,type=self.open_file()
        print(dir_path)
        self.ui.edit_m.setPlainText(dir_path[0])
    def bt_infofunc(self):#公交线路导入
        dir_path,type=self.open_file()
        print(dir_path)
        self.ui.edit_info.setPlainText(dir_path[0])
    '''核心算法与子线程建立'''
    def bt_totalfunc(self):#数据处理主程序，需要将运算量大的算法在子程序中运行，不然会卡死
        base_info=self.base_info

        '''程序进度条设置'''
        self.ui.progressBar.setRange(0,100)
        self.path_gps=self.ui.edit_input.toPlainText()
        self.ms.text_print.emit(self.ui.edit_grid,self.ui.progressBar,"正在读取GPS数据",1)
        self.ms.text_print.emit(self.ui.edit_trip,self.ui.progressBar,"正在读取GPS数据",1)
        self.ms.text_print.emit(self.ui.edit_m,self.ui.progressBar,"正在读取GPS数据",1)
        sort_data=self.Data_sort(base_info) #数据排序

        '''数据处理——栅格化、轨迹提取、城市路网权重矩阵建立'''
        self.ms.text_print.emit(self.ui.edit_grid,self.ui.progressBar,"正在进行数据栅格化",25)
        self.dataagg,path=self.to_geohash(base_info,sort_data,6) #数据栅格化与统计
        #self.ui.edit_grid.setPlainText(path)
        self.ms.text_print.emit(self.ui.edit_grid,self.ui.progressBar,path,49)

        self.ms.text_print.emit(self.ui.edit_trip,self.ui.progressBar,"正在进行轨迹数据提取",50)
        self.trip_data,path=self.GetTrip(base_info,sort_data) #轨迹提取
        #self.ui.edit_trip.setPlainText(path)
        self.ms.text_print.emit(self.ui.edit_trip,self.ui.progressBar,path,74)
        
        self.ms.text_print.emit(self.ui.edit_m,self.ui.progressBar,"正在进行城市路网权重矩阵建立",75)
        self.pm,self.im,path=self.create_g(dataagg,trip_data,base_info) #城市路网权重矩阵建立
        self.ui.edit_m.setPlainText(path)
        #self.edges=create_graph(im) #图的建立
        self.ms.text_print.emit(self.ui.edit_m,self.ui.progressBar,path,99)

        '''操作成功'''
        QMessageBox.information(self.ui,'操作成功','请继续下一步操作')
    def new_bt_totalfunc(self): # 新线程入口函数，将bt_totalfunc在子程序中运行
        thread = Thread(target=self.bt_totalfunc)
        thread.start()
    def preact(self,pt,pb,text,int1):#相应从子线程发来的信号
        pt.setPlainText(text)
        pb.setValue(int1)
    '''基于地址导入数据'''
    def bt_infunc(self):#将各edit栏中地址对应的数据存放到类
        self.ui.progressBar_3.setRange(0,4)
        self.path_gps=self.ui.edit_input.toPlainText()
        self.path_grid=self.ui.edit_grid.toPlainText()
        self.path_trip=self.ui.edit_trip.toPlainText()
        self.path_mat=self.ui.edit_m.toPlainText()

        self.gps=pd.read_csv(self.path_gps,nrows=1000,names=['ID','报警','if_empty','顶灯状态','高架','刹车','接收时间','GPS测定时间','经度','纬度','速度','方向','卫星个数'],index_col=0)
        #print(self.gps)
        self.ui.progressBar_3.setValue(1)

        self.grid=pd.read_csv(self.path_grid,header=0,index_col=0)
        #print(self.grid)
        self.ui.progressBar_3.setValue(2)

        self.trip=pd.read_csv(self.path_trip,nrows=1000,header=0,index_col=0)
        #self.trip=trip.iloc[:,:100]
        #print(self.trip)
        self.ui.progressBar_3.setValue(3)

        mat=pd.read_csv(self.path_mat,header=0,index_col=0)
        self.mat=mat
        self.im=mat.values.tolist()
        #trip.iloc[:,:100]
        #print(self.mat)
        self.ui.progressBar_3.setValue(4)
        '''操作成功'''
        QMessageBox.information(self.ui,'操作成功','请继续下一步操作')
    '''单选框逻辑'''  
    def rb_ndatafunc(self):
        self.reset()
        self.ui.bt_total.setEnabled(True)
    def rb_mdatafunc(self):
        self.reset()
        self.ui.bt_grid.setEnabled(True)
        self.ui.bt_trip.setEnabled(True)
        self.ui.bt_m.setEnabled(True)
        self.ui.edit_grid.setEnabled(True)
        self.ui.edit_trip.setEnabled(True)
        self.ui.edit_m.setEnabled(True)
        self.ui.spinBox_3.setEnabled(True)
    def rb_gpsfunc(self):#查看导入的GPS数据
        print("用户选择输出GPS数据")
        self.ui.DATA.clearContents()
        #item = QTableWidgetItem()
        df = self.gps.iloc[:,:1001]
        df_columns = df.columns.size
        df_header = df.columns.values.tolist()
        self.ui.DATA.setColumnCount(df_columns)
        self.ui.DATA.setRowCount(1001)
        self.ui.DATA.setHorizontalHeaderLabels(df_header)
        #item.setText(df)
        #item.setText('这也能bug？')
        for i in range(0,df_columns):
            for j in range(0,1000):
                self.ui.DATA.setItem(j,i,QTableWidgetItem(str(df.iloc[j,i])))
    def rb_gridfunc(self):#查看导入的栅格数据
        print("用户选择输出栅格数据")
        self.ui.DATA.clearContents()
        #item = QTableWidgetItem()
        df = self.grid.iloc[:1000,:]
        df_columns = df.columns.size
        df_header = df.columns.values.tolist()
        self.ui.DATA.setColumnCount(df_columns)
        self.ui.DATA.setRowCount(1001)
        self.ui.DATA.setHorizontalHeaderLabels(df_header)
        #item.setText(df)
        #item.setText('这也能bug？')
        for i in range(0,df_columns):
            for j in range(0,1000):
                self.ui.DATA.setItem(j,i,QTableWidgetItem(str(df.iloc[j,i])))
    def rb_tripfunc(self):#查看导入的行驶轨迹数据
        print("用户选择输出轨迹数据")
        self.ui.DATA.clearContents()
        #item = QTableWidgetItem()
        df = self.trip.iloc[:1000,:30]
        #print(df)
        df_columns = df.columns.size
        df_header = df.columns.values.tolist()
        self.ui.DATA.setColumnCount(df_columns)
        self.ui.DATA.setRowCount(1001)
        self.ui.DATA.setHorizontalHeaderLabels(df_header)
        #item.setText(df)
        #item.setText('这也能bug？')
        for i in range(0,df_columns):
            for j in range(0,1000):
                self.ui.DATA.setItem(j,i,QTableWidgetItem(str(df.iloc[j,i])))
    def rb_mfunc(self):#查看导入的城市路网权重矩阵
        print("用户选择输出权重矩阵数据")
        self.ui.DATA.clearContents()
        #item = QTableWidgetItem()
        df = self.mat.iloc[:1000,:30]
        #print(df)
        df_columns = df.columns.size
        df_header = df.columns.values.tolist()
        self.ui.DATA.setColumnCount(df_columns)
        self.ui.DATA.setRowCount(1001)
        self.ui.DATA.setHorizontalHeaderLabels(df_header)
        #item.setText(df)
        #item.setText('这也能bug？')
        for i in range(0,df_columns):
            for j in range(0,1000):
                self.ui.DATA.setItem(j,i,QTableWidgetItem(str(df.iloc[j,i])))
    def rb_stafunc(self):#查看导入的公交线路信息
        print("用户选择输出线路统计数据")
        self.ui.DATA2.clearContents()
        #item = QTableWidgetItem()
        df = self.station
        #print(df)
        df_columns = df.columns.size
        df_header = df.columns.values.tolist()
        self.ui.DATA2.setColumnCount(df_columns)
        self.ui.DATA2.setRowCount(1001)
        self.ui.DATA2.setHorizontalHeaderLabels(df_header)
        #item.setText(df)
        #item.setText('这也能bug？')
        for i in range(0,df_columns):
            for j in range(0,len(df)):
                self.ui.DATA2.setItem(j,i,QTableWidgetItem(str(df.iloc[j,i])))
    def rb_evalufunc(self):#查看现有线路评估信息
        print("用户选择现有线路评估信息")
        self.ui.DATA2.clearContents()
        #item = QTableWidgetItem()
        df = self.evalu
        #print(df)
        df_columns = df.columns.size
        df_header = df.columns.values.tolist()
        self.ui.DATA2.setColumnCount(df_columns)
        self.ui.DATA2.setRowCount(1001)
        self.ui.DATA2.setHorizontalHeaderLabels(df_header)
        #item.setText(df)
        #item.setText('这也能bug？')
        for i in range(0,df_columns):
            for j in range(0,len(df)):
                self.ui.DATA2.setItem(j,i,QTableWidgetItem(str(df.iloc[j,i])))
    def rb_btrlinefunc(self):#查看定制线路信息
        print("用户选择输出优化线路数据")
        self.ui.DATA2.clearContents()
        #item = QTableWidgetItem()
        df = self.btrline
        #print(df)
        df_columns = df.columns.size
        df_header = df.columns.values.tolist()
        self.ui.DATA2.setColumnCount(df_columns)
        self.ui.DATA2.setRowCount(1001)
        self.ui.DATA2.setHorizontalHeaderLabels(df_header)
        #item.setText(df)
        #item.setText('这也能bug？')
        for i in range(0,df_columns):
            for j in range(0,len(df)):
                self.ui.DATA2.setItem(j,i,QTableWidgetItem(str(df.iloc[j,i])))
    '''线路生成按钮响应函数'''
    def bt_alzlinefunc(self):#生成城市公交站点统计数据
        self.ui.progressBar_2.setRange(0,100)
        self.path_info=self.ui.edit_info.toPlainText()
        self.station=pd.read_csv(self.path_info,encoding='ansi')
        self.evalu=pd.read_csv(r"E:\SRTP数据\3\3_03_04_evalureport.csv")
        try:
            self.station_count(self.base_info,self.grid,self.station) #公交站点信息统计
            QMessageBox.information(self.ui,'操作成功','请继续下一步操作')
        except:
            QMessageBox.information(self.ui,'操作失败','请确保已正确输入前置数据！')
    def bt_btrlinefunc(self):#Button:Create_Line
        if(self.edges==0):
            self.edges=self.create_graph(self.im) #若先前未建立过城市路网权重矩阵，则进行图的建立
        self.number=self.ui.edit_btrline.text()
        self.Check_CreateLine(self.grid,self.edges,self.base_info) #查询对应线路信息与生成区域内定制线路

    def bt_showoutfunc(self):
        #self.ui.webview.load('http://www.baidu.com/')
        os.system('"C:/Program Files/Internet Explorer/iexplore.exe" http://www.baidu.com')

    '''数据处理、轨迹提取'''
    def Data_sort(self,base_info):
        '''数据初始化、拆分。初始表头生成'''
        total_data = pd.read_csv(self.path_gps,skiprows=1,\
                            names=['ID','报警','if_empty','顶灯状态','高架','刹车','接收时间','GPS测定时间','经度','纬度','速度','方向','卫星个数'],\
                            encoding='utf-8', iterator=True, chunksize=1000000,header=None)
        safile=pd.DataFrame(columns=('ID','time','lon','lat','if_empty','speed'))
        safile.to_csv(base_info[3]+r"\{0}\timeData{0}_{1}-{2}.csv".format(base_info[0],base_info[1],base_info[2]))

        '''数据OD提取（运行过程中不要打开文件）'''
        path2=base_info[3]+r"\{0}\timeData{0}_{1}-{2}.csv".format(base_info[0],base_info[1],base_info[2])
        times=1
        print("GPS数据开始处理")
        for chunk in total_data:
            chunk=chunk.loc[:,['ID', '接收时间', '经度', '纬度', 'if_empty','速度']]
            save_file=chunk[(chunk['接收时间']>='2015-04-0{0} {1}:00:00'.format(base_info[0],base_info[1]))&(chunk['接收时间']<='2015-04-0{0} {1}:00:00'.format(base_info[0],base_info[2]))&(chunk['if_empty']==0)]
            save_file.sort_values(by=['ID','接收时间'],inplace=True,na_position='first',kind='quicksort')
            save_file.to_csv(base_info[3]+r"\{0}\timeData{0}_{1}-{2}.csv".format(base_info[0],base_info[1],base_info[2]),mode="a",header=False)
            tqdm.pandas(desc="数据排序进度！")
            print("\r{0},进度：{1}/115".format('■'*times,times),end='', flush=True)
            times=times+1
            self.ms.text_print.emit(self.ui.edit_grid,self.ui.progressBar,path2,int(times/5))
        '''排序'''
        sort_data=pd.read_csv(base_info[3]+r"\{0}\timeData{0}_{1}-{2}.csv".format(base_info[0],base_info[1],base_info[2]))
        sort_data.sort_values(by=['ID','time'],inplace=True,na_position='first',kind='mergesort')
        print("数据排序成功！")
        sort_data.index=range(len(sort_data))
        sort_data=sort_data.iloc[:,1:]
        
        return sort_data
    def to_geohash(self,base_info,sort_data,precision_num):
        '''将轨迹数据栅格化'''
        total_data=sort_data
        #依据经纬度geohash编码，精确度选6时，栅格大小约为±0.61km
        total_data['geohash'] = tbd.geohash_encode(total_data['lon'],total_data['lat'],precision=precision_num)
        total_data.to_csv(base_info[3]+r"\{0}\timeData{0}_{1}-{2}.csv".format(base_info[0],base_info[1],base_info[2]),mode='w')#数据栅格化完成
        print("Gps数据栅格化成功！")
        path2=base_info[3]+r"\{0}\精度{3}dataagg_day{0}_{1}-{2}.csv".format(base_info[0],base_info[1],base_info[2],precision_num)
        self.ms.text_print.emit(self.ui.edit_grid,self.ui.progressBar,path2,35)
        '''统计各个栅格的数据'''
        #基于geohash编码集计
        dataagg = total_data.groupby(['geohash'])['ID'].count().reset_index()
        #geohash编码生成栅格矢量图形
        dataagg['geometry'] = tbd.geohash_togrid(dataagg['geohash'])
        #转换为GeoDataFrame
        dataagg = gpd.GeoDataFrame(dataagg)
        #geohash编码解码为经纬度
        dataagg['lon']=0
        dataagg['lat']=0
        
        for i in range(0,len(dataagg)):
            a=re.findall(r"\d+\.?\d*",str(dataagg.loc[i,'geometry']))
            dataagg.iloc[i,-2]=(float(a[0])+float(a[4]))/2
            dataagg.iloc[i,-1]=(float(a[1])+float(a[3]))/2
        self.ms.text_print.emit(self.ui.edit_grid,self.ui.progressBar,path2,40)
        #栅格内平均速度计算
        dataagg['speed']=0
        dataagg.index=dataagg['geohash']
        for i in range(len(total_data)):
            sign=total_data.loc[i,'geohash']
            speed=float(total_data.loc[i,'speed'])
            if(speed<=60):
                dataagg.loc[sign,'speed']+=speed
            else:
                dataagg.loc[sign,'ID']-=1
        dataagg.index=range(len(dataagg))
        for i in range(len(dataagg)):
            try:
                dataagg.loc[i,'speed']=dataagg.loc[i,'speed']/dataagg.loc[i,'ID']
            except:
                continue
        self.ms.text_print.emit(self.ui.edit_grid,self.ui.progressBar,path2,45)
        dataagg.to_csv(base_info[3]+r"\{0}\精度{3}dataagg_day{0}_{1}-{2}.csv".format(base_info[0],base_info[1],base_info[2],precision_num),mode='w')#保存栅格数据
        
        print("栅格统计数据保存成功！")
        return dataagg,path2
    def station_count(self,base_info,dataagg,station):
        '''将公交站点栅格化，并统计附近数据点数量'''
        station['number']=0
        dat=copy(dataagg)
        station['geohash']= tbd.geohash_encode(station['lng84'],station['lat84'],6)
        dat.index=dat.iloc[:,0]
        station.index=station['geohash']
        prec=0
        for i in station['geohash']:
            prec+=1
            self.ui.progressBar_2.setValue(int(prec/len(station)*100))
            try:
                station.loc[i,'number']=dat.loc[i,'ID']
            except:
                continue
        station.to_csv(base_info[3]+r"\{0}\station_day{0}_{1}-{2}.csv".format(base_info[0],base_info[1],base_info[2]),encoding='ansi',mode='w')#保存站点数据
        self.station=station      
    def caltime(self,a,b):#a.hour*60+a.minute
        return abs(a.hour*60+a.minute-b.hour*60-b.minute)
    def GetTrip(self,base_info,total_data):
        '''数据路径提取与保存'''
        ori_data=total_data
        ori_data['time']=pd.to_datetime(ori_data['time'],format="%Y-%m-%d %H:%M:%S")
        '''储存列表初始化'''
        path2=base_info[3]+r"\{0}\Day{0}trip2_{1}-{2}.csv".format(base_info[0],base_info[1],base_info[2])
        p=0
        a=list([[0, 0, 0]])
        a[p][0]=ori_data.iloc[0][0]
        a[p][1]=ori_data.iloc[0][1]
        a[p].append(ori_data.loc[0,'geohash'])
        a.append([0, 0, 0])
        '''提取每条轨迹及其经过的栅格'''
        for i in tqdm(range(1,len(ori_data))):
            if(self.caltime(ori_data.iloc[i][1],ori_data.iloc[i-1][1])>3 or ori_data.iloc[i][0]!=ori_data.iloc[i-1][0]):
                a[p][2]=ori_data.iloc[i-1][1]
                drop_reapt=[]
                for x in a[p][3:]:
                    if x not in drop_reapt:
                        drop_reapt.append(x)
                a[p][3:]=drop_reapt
                p+=1 #开始提取下一个轨迹
                a.append([0,0,0])
                a[p][0]=ori_data.iloc[i][0]
                a[p][1]=ori_data.iloc[i][1]
                a[p].append(ori_data.loc[i,'geohash'])
            else:
                a[p].append(ori_data.loc[i,'geohash'])
            percent=int(50+25*i/len(ori_data))
            self.ms.text_print.emit(self.ui.edit_grid,self.ui.progressBar,path2,percent)
        drop_reapt=[]
        for x in a[p]:
            if x not in drop_reapt:
                drop_reapt.append(x)
        a[p]=drop_reapt
        save_file=pd.DataFrame(a)
        save_file=save_file.iloc[:,1:]
        save_file.to_csv(base_info[3]+r"\{0}\Day{0}trip2_{1}-{2}.csv".format(base_info[0],base_info[1],base_info[2]))
        return save_file,path2
    '''正、反邻接矩阵生成'''
    def create_g(self,dataagg,trip_data,base_info):
        maxnum=0
        path2=base_info[3]+r"\{0}\antiTriplinjie_day{0}_{1}-{2}.csv".format(base_info[0],base_info[1],base_info[2])
        for i in range(0,len(trip_data)):
            if maxnum<=len(trip_data.loc[i,:]):
                maxnum=len(trip_data.loc[i,:])
        df=pd.DataFrame(columns=dataagg['geohash'],index=dataagg['geohash'])
        df=df.fillna(0)     #生成空邻接矩阵
        '''空邻接矩阵赋值'''
        for i in trange(0,len(trip_data)-1):
            j=2
            if(pd.isnull(trip_data.iloc[i,j])==True):
                continue
            else:
                a=trip_data.iloc[i,j]
            for j in range(3,maxnum):
                if(pd.isnull(trip_data.iloc[i,j])==False and j<maxnum):
                    b=trip_data.iloc[i,j]
                    num=df.loc[a,b]
                    df.loc[a,b]=num+1
                    a=trip_data.iloc[i,j]
                else:
                    break
        df.to_csv(base_info[3]+r"\{0}\Triplinjie_day{0}_{1}-{2}.csv".format(base_info[0],base_info[1],base_info[2]))#生成邻接矩阵并存储
        print("邻接矩阵存储成功！")
        self.ms.text_print.emit(self.ui.edit_grid,self.ui.progressBar,path2,85)
        m = df.values.tolist()
        a=m
        for i in range(0,len(m)):
            for j in range(0,len(df)):
                if m[i][j]>0:
                    m[i][j]=1.0/m[i][j]
        M=99999
        for i in range(0,len(m)):
            for j in range(0,len(m[i])):
                if m[i][j]==0 or i==j:  
                    m[i][j]=M
        self.ms.text_print.emit(self.ui.edit_grid,self.ui.progressBar,path2,95)
        df=pd.DataFrame(m)
        df.to_csv(base_info[3]+r"\{0}\antiTriplinjie_day{0}_{1}-{2}.csv".format(base_info[0],base_info[1],base_info[2]))#生成邻接矩阵并存储
        #self.pm=a
        self.mat=m
        
        return a,m,path2   #返回值为正、反邻接矩阵
    '''路径生成-Dijkstra算法'''
    def dijkstra_raw(self,edges, from_node, to_node):
        g = defaultdict(list)
        for l,r,c in edges:
            g[l].append((c,r))
        q, seen = [(0,from_node,())], set()
        while q:
            (cost,v1,path) = heappop(q)
            if v1 not in seen:
                seen.add(v1)
                path = (v1, path)
                if v1 == to_node:
                    return cost,path
                for c, v2 in g.get(v1, ()):
                    if v2 not in seen:
                        heappush(q, (cost+c, v2, path))
        return float("inf"),[]
    def dijkstra(self,edges, from_node, to_node):
        len_shortest_path = -1
        ret_path=[]
        length,path_queue = self.dijkstra_raw(edges, from_node, to_node)
        if len(path_queue)>0:
            len_shortest_path = length## 1. Get the length firstly;
            ## 2. Decompose the path_queue, to get the passing nodes in the shortest path.
            left = path_queue[0]
            ret_path.append(left)## 2.1 Record the destination node firstly;
            right = path_queue[1]
            while len(right)>0:
                left = right[0]
                ret_path.append(left)## 2.2 Record other nodes, till the source-node.
                right = right[1]
            ret_path.reverse()	## 3. Reverse the list finally, to make it be normal sequence.
        return len_shortest_path,ret_path
    '''根据邻接矩阵建立图'''
    def create_graph(self,m):
        list_nodes_id = range(0,len(m))
        M_topo = m
        edges = []
        M=99999
        for i in range(len(M_topo)):
            for j in range(len(M_topo[0])):
                if i!=j and M_topo[i][j]!=M:
                    edges.append((i,j,M_topo[i][j]))### (i,j) 为一条边; M_topo[i][j]为边的权重
        return edges
    def findline(self,dataagg,base_info):
        strat=0
        end=0
        points=0
        num=int(self.number)
        self.ui.edit_btrshow.setPlainText('''待优化线路信息如下\n''')
        try:
            line_info=pd.read_csv(base_info[3]+r"\station_info\线路拆分\线路{0}.csv".format(num))
        except:
            self.ui.edit_btrshow.appendPlainText("线路不存在")
            return False
        for i in range(0,len(dataagg['geohash'])):
            if dataagg.iloc[i,0]==line_info.iloc[0,10]:
                self.ui.edit_btrshow.appendPlainText("起始站的栅格为{0}，节点编号为{1}\n".format(dataagg.iloc[i,0],i))
                start=i
            if dataagg.iloc[i,0]==line_info.iloc[-1,10]:
                self.ui.edit_btrshow.appendPlainText("终点站的栅格为{0}，节点编号为{1}\n".format(dataagg.iloc[i,0],i))
                end=i
            if dataagg.iloc[i,0] in line_info.iloc[:,10].tolist():
                points+=int(dataagg.iloc[i,1])
        self.ui.edit_btrshow.appendPlainText("该条线路的总流量为{0}\n".format(points))
        return num,points,start,end,line_info
    def Check_CreateLine(self,dataagg,edges,base_info):
        p,points,start,end,line_info=self.findline(dataagg,base_info)
        self.ui.edit_btrshow.appendPlainText("=============== Dijkstra ===============\n")
        length,Shortest_path = self.dijkstra(edges,start,end)
        self.ui.edit_btrshow.appendPlainText("length = {}\n".format(length))
        self.ui.edit_btrshow.appendPlainText("The shortest path is {}\n".format(Shortest_path))
        '''储存站点信息'''
        num=Shortest_path
        sava=[]
        for i in num:
            sava.append(dataagg.iloc[i,:].tolist())
        sava=pd.DataFrame(sava)
        sava.index=num
        sava['if_new']=0
        sava['new_num']=0
        sava['speed']=0
        for i in num:
            if sava.loc[i,0] not in line_info.iloc[:,-1].tolist():
                sava.loc[i,'if_new']=1
            sava.loc[i,'new_num']=dataagg.loc[i,'ID']
            sava.loc[i,'speed']=dataagg.loc[i,'speed']
        sava.to_csv(base_info[3]+r"\{1}\优化线路{0}-time{2}-{3}.csv".format(p,base_info[0],base_info[1],base_info[2]))
        self.btrline=sava

