import sys
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy import text
# Press the green button in the gutter to run the script.
print("Successfully use Python!")
dbname = sys.argv[1]
file_path = sys.argv[2]
engine = create_engine("mysql+pymysql://root:123456@localhost:3306/test?charset=utf8")
try:
    # engine.connect().execute("CREATE SCHEMA `{0}` ;".format(dbname))
    query = text("CREATE SCHEMA `{0}` ;".format(dbname))
    engine.execute(query)
except:
    print("already!")
query = text("USE `{0}`;".format(dbname))
engine.connect().execute(query)
total_data = pd.read_csv(file_path, skiprows=1, \
                         usecols=[1, 2, 3, 4, 5, 6], \
                         names=['ID', 'time', 'lon', 'lat', 'if_empty', 'speed'], \
                         encoding='utf-8', iterator=True, chunksize=400000, header=None)
time = 0
for chunk in total_data:
    left = 0
    df = pd.DataFrame(columns=["ID", "time", "lon", "lat", "if_empty", "speed"])
    n = int(chunk.size / 6)
    chunk.sort_values(by=['ID'], inplace=True, na_position='first')
    #     print(chunk)
    #     break
    time += 1
    print("Data{0} inputing MySql".format(time))
    sys.stdout.flush()
    for i in range(0, n):
        # print("\r NOW LINE:{0} are inputing".format(i),end="",flush=False)
        pre = chunk.iloc[i - 1, 0]
        if (i == 0 or chunk.iloc[i, 0] == pre):
            continue
        if (i == n - 1 or chunk.iloc[i, 0] != pre):
            df=pd.concat([df,chunk.iloc[left:i, :]], ignore_index=True)
            pd.concat([df,chunk.iloc[left:i, :]], ignore_index=True).to_sql("taxi{0}".format(pre), engine, schema=dbname, if_exists='append', index=True, chunksize=None,dtype=None)
            df = pd.DataFrame(columns=["ID", "time", "lon", "lat", "if_empty", "speed"])
            left = i
    #         更新左指针至当前位置
    print("Data{0} inputed MySql successfully".format(time))

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
