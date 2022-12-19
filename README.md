# Turtlebot_rowma
## タートルボットで森岡研究室内を巡回するシステム

###　ROS
まずは、ロボットを操作するために[ROS](http://wiki.ros.org/ja)をインストールする必要があります。

ついでに森岡研究室のロボットを動かせるようにするといいかも。※Githubアカウントの作成とmorioka_labへの参加が必要
[MoriokaLab](https://github.com/morioka-lab/ros-instruction) 

###　Turtlebot
このシステムでは、turtlebot2を用いていますので、これについても対象のROSパッケージをインストールする必要があります。
[こちらのサイト](https://qiita.com/s_makinaga/items/0547ae13f8f4687538e4)を参考にROSパッケージをインストールしてください。
このサイトでは、ROSのセットアップもしていますが、そこはすでに終わっているものとして、４のTurtlebot用のパッケージというところから始めてください。

###　Rowma
ロボットとのスマホアプリをつなぐシステムとして[Rowma](https://github.com/rowma)（Robot Web Manager）というものを使います。
Rowmaも必要なROSパッケージがあるので、インストールします。

```sh
cd ~/catkin_ws/src
git clone https://github.com/rowma/rowma_ros
cd rowma_ros
pip install -r requirements.txt
catkin_make
```
