<?php  
header('Content-Type:text/html;charset=utf-8');
header("Access-Control-Allow-Origin:*"); //允许任何访问(包括ajax跨域)   
$host='localhost';//主机  
$user='root';//数据库账号  
$password='111111';//数据库密码  
$database='study';//数据库名  
//$tablename='user';//数据库中名为listtop的表  
mysql_connect($host,$user,$password) or die("error");//连接数据库管理系统  
mysql_select_db($database);//选择操作数据库  
mysql_query("SET NAMES utf8");//设置设置UTF-8编码(JSON的唯一编码)，数据库整理为：utf8_general_ci，以此达到输出中文简体的目的  
  
/*查询方法1，直接取值*/  
//$returnData="SELECT * FROM listtop where listTop='listTop4'";  
//$returnData=mysql_query("SELECT * FROM user"); 
$username = $_GET['username'];
$returnData=mysql_query("SELECT * FROM user where name='".$username."'"); 

// $username = $_GET['username'];
// $returnData=mysql_query("SELECT * FROM user where name='".$username."'");


// $username = $_POST['username'];
// $password = $_POST['password'];
//$returnData=mysql_query("SELECT * FROM user where name='".$username."'"); 
//$sql = "INSERT INTO user (id, name, pwd) VALUES (9,'".$username."', '".$password."')"
//$returnData=mysql_query($sql); 

  
/*查询方法2，提取sql语句，再利用mysql_query();执行*/  
//$sql="SELECT * FROM listtop where listTop='".$listTopNum."'";  
//$returnData=mysql_query($sql);  
  
/*查询方法3，POST传参*/  
//$listTopNum = $_POST['listTopNum'];//ajax中的data参数用同名变量接收  
//$returnData=mysql_query("SELECT * FROM listtop where listTop='".$listTopNum."'");  
  
/* 
mysql_query();执行sql语句，对 SELECT，SHOW，EXPLAIN 或 DESCRIBE 语句返回一个资源标识符，对于其他sql语句返回true，出错则都返回false。 
资源标识符：mysql_query()如果里面放的是查询之类的语句，说白了就是要查的数据结果集；如果里面放的是增删改之类的语句，那返回的是true或者false。 
如果要使用这个数据结果集，必须用mysql_result(), mysql_fetch_array(), mysql_fetch_row(),mysql_fetch_assoc()等函数获取里面的数据，就是mysql_query()得和上面几个函数配合使用。 
重要属性： 
    mysql_fetch_row — 从结果集中取得一行作为枚举数组, 要返回的话尽量不用 
    mysql_fetch_array() - 从结果集中取得一行作为关联数组，或数字数组，或二者兼有 
    mysql_fetch_assoc() - 从结果集中取得一行作为关联数组 
    mysql_fetch_object() - 从结果集中取得一行作为对象 
    mysql_data_seek() - 移动内部结果的指针 
    mysql_fetch_lengths() - 取得结果集中每个输出的长度 
    mysql_result() - 取得结果数据 
属性说明： 
    都是取一行，并转换成数组，所以下面的循环就是将多行集成在一个数组中，此例中只有一行，就是数据库listtop10中的数据表listtop中键listTop的值为listTop4这一行的所有数据， 
    如果传的参为listTop4跟listTop5，就会有两行，那么listTop4_bookName就需要调用json对象，用data[0].listTop_bookName;取出，同理listTop5_bookName就需要调用json对象，用data[1].listTop_bookName;取出 
付数据库中的数据图示： 
    ----数据库：listtop10-------------------------------------------- 
    ----数据表：listtop---------------------------------------------- 
    ----------------------------------------------------------------- 
    --  键  --  listTop  --  listTop_bookName  --  listTop_author  -- 
    --  值  --  listTop4 --  《主线任务》      --  遁地的地鼠      -- 
    --  值  --  listTop5 --  《无语的我》      --  微枫页          -- 
    ----------------------------------------------------------------- 
*/  
  
// while($result=mysql_fetch_assoc($returnData)){  
//    $listTop_info[]=$result;//将取得的所有数据，一行两行或者三行，此例只有一行，赋值给listTop_info数组  
// }  
// echo json_encode($listTop_info);//将listTop_info数组转换成json数组，这要求ajax的请求中设置返回数据格式为json，具体设置方法为...,dataType:'json',...  
//echo就是php返回的值，传递给ajax的success:function(data){}中的参数data，data[0]就是$listTop_info[0]就是第一次循环取得的第一行的数据  
echo $returnData;
?>  