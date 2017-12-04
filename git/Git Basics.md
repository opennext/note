## 获取 Git 仓库
- 在现有目录中初始化仓库
```
$ git init

$ git add *.c
$ git add LICENSE
$ git commit -m 'initial project version'
```
- 克隆现有的仓库
>Git 克隆的是该 Git 仓库服务器上的几乎所有数据，而不是仅仅复制完成你的工作所需要文件。 当你执行 git clone 命令的时候，默认配置下远程 Git 仓库中的每一个文件的每一个版本都将被拉取下来。 事实上，如果你的服务器的磁盘坏掉了，你通常可以使用任何一个克隆下来的用户端来重建服务器上的仓库

```
$ git clone https://github.com/libgit2/libgit2
or
$ git clone https://github.com/libgit2/libgit2 mylibgit
```
## 记录每次更新到仓库
文件的生命周期
- 只能已跟踪或未跟踪
![文件的状态变化周期](basic-1-lifecycle.png)

### 检查当前文件状态
```
$ git status
On branch master
nothing to commit, working directory clean
```
```
$ echo 'My Project' > README
$ git status
On branch master
Untracked files:
  (use "git add <file>..." to include in what will be committed)

    README

nothing added to commit but untracked files present (use "git add" to track)
```
### 跟踪新文件
```
$ git add README

$ git status
On branch master
Changes to be committed: //就说明是已暂存状态
  (use "git reset HEAD <file>..." to unstage)

    new file:   README
```
### 暂存已修改文件
```
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

    new file:   README

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    modified:   CONTRIBUTING.md
```
### 状态简览 
| Type | Content |
| - | - | 
| ?? | 新添加的未跟踪 |
| A | 新添加到暂存区 |
| M | 右：表示该文件被修改了但是还没放入暂存区，左：文件被修改了并放入了暂存区 |
```
$ git status -s
 M README
MM Rakefile
A  lib/git.rb
M  lib/simplegit.rb
?? LICENSE.txt
```
### 忽略文件
`.gitignore `
```
.DS_Store
*.log
node_modules
dist
lib
es
coverage
_book
```