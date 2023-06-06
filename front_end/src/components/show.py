# import sys
# import pandas as pd
# from sqlalchemy import create_engine
# from sqlalchemy import text
# import re
# print("Successfully use Python!")
# # 匹配符合要求的列
# def FindMatchColumn(dataframe, regex):
#     for idx,column in dataframe.columns:
#         if re.match(regex, str(dataframe[column].iloc[0])):
#             return idx
#     return "正则表达式匹配失败"
# dbname = sys.argv[1]
# file_path = sys.argv[2]
# engine = create_engine("mysql+pymysql://root:123456@localhost:3306/test?charset=utf8")
# try:
#     query = text("CREATE SCHEMA `{0}` ;".format(dbname))
#     engine.execute(query)
# except:
#     print("already!")
# query = text("USE `{0}`;".format(dbname))
# engine.connect().execute(query)
# head=pd.read_csv(file_path,nrows=100,encoding='utf-8')#用于匹配表项数据
# total_data = pd.read_csv(file_path, skiprows=1, \
#                          usecols=[1,\
#                                   FindMatchColumn("^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$"),\
#                                   FindMatchColumn("^[0-1]?[0-7]?[0-9]\.\d{4,}$")\
#                                   FindMatchColumn("^[0-8]?[0-9]\.\d{4,}$")\
#                                   FindMatchColumn("^[01]$")\
#                                   FindMatchColumn("^[0-1]?[0-4]?[0-9]\.\d{4,}$")\],\
#                          names=['ID', 'time', 'lon', 'lat', 'if_empty', 'speed'], \
#                          encoding='utf-8', iterator=True, chunksize=400000, header=None)
# time = 0
# for chunk in total_data:
#     left = 0
#     df = pd.DataFrame(columns=["ID", "time", "lon", "lat", "if_empty", "speed"])
#     n = int(chunk.size / 6)
#     chunk.sort_values(by=['ID'], inplace=True, na_position='first')
#     #     print(chunk)
#     #     break
#     time += 1
#     print("Data{0} inputing MySql".format(time))
#     sys.stdout.flush()
#     for i in range(0, n):
#         pre = chunk.iloc[i - 1, 0]
#         if (i == 0 or chunk.iloc[i, 0] == pre):
#             continue
#         if (i == n - 1 or chunk.iloc[i, 0] != pre):
#             df=pd.concat([df,chunk.iloc[left:i, :]], ignore_index=True)
#             pd.concat([df,chunk.iloc[left:i, :]], ignore_index=True).to_sql("taxi{0}".format(pre), engine, schema=dbname, if_exists='append', index=True, chunksize=None,dtype=None)
#             df = pd.DataFrame(columns=["ID", "time", "lon", "lat", "if_empty", "speed"])
#             left = i
#     print("Data{0} inputed MySql successfully".format(time))
