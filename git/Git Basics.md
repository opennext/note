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

### 查看已暂存和未暂存的修改

`git diff`: 只显示尚未暂存的改动。工作目录中当前文件和暂存区域快照之间的差异，也就是修改之后还没有暂存起来的变化内容。

`git diff --staged`: 查看已暂存的将要添加到下次提交里的内容

### 跳过使用暂存区域
`git commit -a -m 'added new benchmarks'`

### 移除
```
$ git rm PROJECTS.md
$ git rm --cached README // 想让文件保留在磁盘，但是并不想让 Git 继续跟踪
$ git rm log/\*.log // 删除 log/ 目录下扩展名为 .log 的所有文件

$ git rm \*~ //删除以 ~ 结尾的所有文件
```
### 移动
`$ git mv README.md README`

## 查看提交历史
```
$ git log
$ git log -p -2 // 显示2次提交
$ git log --stat //简略的统计信息
$ git log --pretty=oneline //short，full 和 fuller
```
```
$ git log --pretty=format:"%h - %an, %ar : %s"
ca82a6d - Scott Chacon, 6 years ago : changed the version number
085bb3b - Scott Chacon, 6 years ago : removed unnecessary test
a11bef0 - Scott Chacon, 6 years ago : first commit
```

Table 1. git log --pretty=format 常用的选项
|选项	| 说明|
| - | - |
|%H | 提交对象（commit）的完整哈希字串|
|%h|提交对象的简短哈希字串|
|%T|树对象（tree）的完整哈希字串|
|%t | 树对象的简短哈希字串|
|%P|父对象（parent）的完整哈希字串|
|%p|父对象的简短哈希字串|
|%an|作者（author）的名字|
|%ae|作者的电子邮件地址|
|%ad|作者修订日期（可以用 --date= 选项定制格式）|
|%ar|作者修订日期，按多久以前的方式显示|
|%cn|提交者（committer）的名字|
|%ce|提交者的电子邮件地址|
|%cd|提交日期|
|%cr|提交日期，按多久以前的方式显示|
|%s|提交说明|

Table 2. git log 的常用选项
|选项	|说明|
|-|-|
|-p|按补丁格式显示每个更新之间的差异。|
|--stat|显示每次更新的文件修改统计信息。|
|--shortstat|只显示 --stat 中最后的行数修改添加移除统计。|
|--name-only|仅在提交信息后显示已修改的文件清单。|
|--name-status|显示新增、修改、删除的文件清单。|
|--abbrev-commit|仅显示 SHA-1 的前几个字符，而非所有的 40 个字符。|
|--relative-date|使用较短的相对时间显示（比如，“2 weeks ago”）。|
|--graph|显示 ASCII 图形表示的分支合并历史。|
|--pretty|使用其他格式显示历史提交信息。可用的选项包括 oneline，short，full，fuller 和 format（后跟指定格式）。|

### 限制输出长度
```
$ git log --since=2.weeks //--since 和 --until

// 筛选选项是 -S
$ git log -S function_name
```
Table 3. 限制 git log 输出的选项
|选项	|说明|
|-|-|
|-(n)|仅显示最近的 n 条提交|
|--since, --after|仅显示指定时间之后的提交。|
|--until, --before|仅显示指定时间之前的提交。|
|--author|仅显示指定作者相关的提交。|
|--committer|仅显示指定提交者相关的提交。|
|--grep|仅显示含指定关键字的提交|
|-S | 仅显示添加或移除了某个关键字的提交|

```
$ git log --pretty="%h - %s" --author=gitster --since="2008-10-01" \
   --before="2008-11-01" --no-merges -- t/
5610e3b - Fix testcase failure when extended attributes are in use
acd3b9e - Enhance hold_lock_file_for_{update,append}() API
f563754 - demonstrate breakage of detached checkout with symbolic link HEAD
d1a43f2 - reset --hard/read-tree --reset -u: remove unmerged new paths
51a94af - Fix "checkout --track -b newbranch" on detached HEAD
b0ad11e - pull: allow "git pull origin $something:$current_branch" into an unborn branch
```

## **撤消操作**
你提交后发现忘记了暂存某些需要的修改，可以像下面这样操。最终你只会有一个提交 - 第二次提交将代替第一次提交的结果。
```
$ git commit -m 'initial commit'
$ git add forgotten_file
$ git commit --amend
```
### 取消暂存的文件
```
$ git reset HEAD CONTRIBUTING.md
Unstaged changes after reset:
M	CONTRIBUTING.md
```
>虽然在调用时加上 --hard 选项可以令 git reset 成为一个危险的命令（可能导致工作目录中所有当前进度丢失！），但本例中工作目录内的文件并不会被修改。 不加选项地调用 git reset 并不危险 — 它只会修改暂存区域。
[更多](https://www.git-scm.com/book/zh/v2/ch00/_git_reset) 。


### 撤消对文件的修改
```
$ git checkout -- CONTRIBUTING.md
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

    renamed:    README.md -> README
```

>Important  
你需要知道 git checkout -- [file] 是一个危险的命令，这很重要。 你对那个文件做的任何修改都会消失 - 你只是拷贝了另一个文件来覆盖它。 除非你确实清楚不想要那个文件了，否则不要使用这个命令。

如果你仍然想保留对那个文件做出的修改，但是现在仍然需要撤消，我们将会在 Git 分支介绍保存进度与分支；这些通常是更好的做法。

记住，在 Git 中任何 已提交的 东西几乎总是可以恢复的。 甚至那些被删除的分支中的提交或使用 --amend 选项覆盖的提交也可以恢复（阅读 [数据恢复](https://www.git-scm.com/book/zh/v2/ch00/_data_recovery) 了解数据恢复）。 然而，任何你未提交的东西丢失后很可能再也找不到了。

## 远程仓库的使用

`git remote`: 列出你指定的每一个远程服务器的简写
```
$ git clone https://github.com/schacon/ticgit
Cloning into 'ticgit'...
remote: Reusing existing pack: 1857, done.
remote: Total 1857 (delta 0), reused 0 (delta 0)
Receiving objects: 100% (1857/1857), 374.35 KiB | 268.00 KiB/s, done.
Resolving deltas: 100% (772/772), done.
Checking connectivity... done.
$ cd ticgit
$ git remote
origin

$ git remote -v
origin	https://github.com/schacon/ticgit (fetch)
origin	https://github.com/schacon/ticgit (push)
```

### 添加远程仓库
`git remote add <shortname> <url>`
```
$ git remote
origin
$ git remote add pb https://github.com/paulboone/ticgit
$ git remote -v
origin	https://github.com/schacon/ticgit (fetch)
origin	https://github.com/schacon/ticgit (push)
pb	https://github.com/paulboone/ticgit (fetch)
pb	https://github.com/paulboone/ticgit (push)
```
可以在命令行中使用字符串 pb 来代替整个 URL。 例如：`git fetch pb`
```
$ git fetch pb
remote: Counting objects: 43, done.
remote: Compressing objects: 100% (36/36), done.
remote: Total 43 (delta 10), reused 31 (delta 5)
Unpacking objects: 100% (43/43), done.
From https://github.com/paulboone/ticgit
 * [new branch]      master     -> pb/master
 * [new branch]      ticgit     -> pb/ticgit
```
### 从远程仓库中抓取与拉取
`$ git fetch [remote-name]`：将会拥有那个远程仓库中所有分支的引用，可以随时合并或查看。并不会自动合并或修改你当前的工作
 
`git pull`： 通常会从最初克隆的服务器上抓取数据并自动尝试合并到当前所在的分支。