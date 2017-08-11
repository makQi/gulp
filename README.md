# gulp的使用

### 命令升级node          
* 注意：windows系统安装的node不能用此命令升级     
* node官网地址下载：https://nodejs.org     
***

`node -v`   
>查看node版本，如果有版本号，说明本机已经安装了nodejs，没有请到官网下载安装。

`npm install -g n`
>全局安装n模块，用来升级node版本，最好用管理员帐户升级。

`n stable`
>升级node到最新稳定版本

`n v6.11.2`
>升级node到指定版本



### npm基本命令
```
npm -v                 查看npm版本

npm version            查看npm版本详细

npm install -g npm@2.9.1        版本号2.9.1 可以根据已发布的版本随意升级或降级

npm init               创建package.json文件，并初始化。

npm install            创建node_modules文件夹，并下载gulpfile.js里面的所有插件。

npm install -g gulp    全局安装gulp插件

npm install --save-dev gulp     本地安装gulp插件，到node_modules文件下。

npm list               列出已安装模块

npm show gulp          显示模块详情

npm update             升级当前目录下的所有模块

npm update gulp        升级当前目录下的指定模块

npm update -g gulp     升级全局安装的gulp模块

npm uninstall gulp     删除指定的模块

```

### 国内用npm下载容易出错，一般是网络原因，你懂的，以下是淘宝的npm镜像。
`npm install -g cnpm --registry=https://registry.npm.taobao.org`
>注意：安装完后最好查看其版本号cnpm -v或关闭命令提示符重新打开，安装完直接使用有可能会出现错误。   
官方网址：http://npm.taobao.org



# liunx命令

### 常用指令
```
rm -rf node_modules      删除文件夹，以及文件夹里面的所有内容。

clear          清屏

exit           退出

ls             显示文件或目录

     -l     列出文件详细信息l(list)

     -a     列出当前目录下所有文件及目录，包括隐藏的a(all)

mkdir          创建目录

     -p     创建目录，若无父目录，则创建p(parent)

cd             切换目录

touch          创建空文件

echo           创建带有内容的文件。

cat            查看文件内容

cp             拷贝

mv             移动或重命名

rm             删除文件

     -r     递归删除，可删除子目录及文件

     -f     强制删除

find           在文件系统中搜索某文件

wc             统计文本中行数、字数、字符数

grep           在文本文件中查找某个字符串

rmdir          删除空目录

tree           树形结构显示目录，需要安装tree包

pwd            显示当前目录

ln             创建链接文件

more、less     分页显示文本文件内容

head、tail     显示文件头、尾内容

ctrl+alt+F1    命令行全屏模式

```


### 系统管理命令
```
stat          显示指定文件的详细信息，比ls更详细

who           显示在线登陆用户

whoami        显示当前操作用户

hostname      显示主机名

uname         显示系统信息

top           动态显示当前耗费资源最多进程信息

ps            显示瞬间进程状态 ps -aux

du            查看目录大小 du -h /home带有单位显示目录信息

df            查看磁盘大小 df -h 带有单位显示磁盘信息

ifconfig      查看网络情况

ping          测试网络连通

netstat       显示网络状态信息

man           命令不会用了，找男人  如：man ls

clear         清屏

alias         对命令重命名 如：alias showmeit="ps -aux" ，另外解除使用unaliax showmeit

kill          杀死进程，可以先用ps 或 top命令查看进程的id，然后再用kill命令杀死进程。

```


### 关机/重启机器
```
shutdown

     -r       关机重启

     -h       关机不重启

     now      立刻关机

halt      关机

reboot    重启

```


### 打包压缩相关命令
```
gzip：

bzip2：

tar:                打包压缩

     -c              归档文件

     -x              压缩文件

     -z              gzip压缩文件

     -j              bzip2压缩文件

     -v              显示压缩或解压缩过程 v(view)

     -f              使用档名

例：

tar -cvf /home/abc.tar /home/abc           只打包，不压缩

tar -zcvf /home/abc.tar.gz /home/abc       打包，并用gzip压缩

tar -jcvf /home/abc.tar.bz2 /home/abc      打包，并用bzip2压缩

当然，如果想解压缩，就直接替换上面的命令  tar -cvf  / tar -zcvf  / tar -jcvf 中的“c” 换成“x” 就可以了。

```



# vim编辑使用
```
vim三种模式：命令模式、插入模式、编辑模式。使用ESC或i或：来切换模式。

命令模式下：

:q                  退出

:q!                 强制退出

:wq                 保存并退出

:set number         显示行号

:set nonumber       隐藏行号

/apache             在文档中查找apache 按n跳到下一个，shift+n上一个

yyp                 复制光标所在行，并粘贴

```

