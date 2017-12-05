**有人把 Git 的分支模型称为它的`‘必杀技特性’'**
>Git 处理分支的方式可谓是难以置信的轻量，创建新分支这一操作几乎能在瞬间完成，并且在不同分支之间的切换操作也是一样便捷。 与许多其它版本控制系统不同，Git 鼓励在工作流程中频繁地使用分支与合并，哪怕一天之内进行许多次。 理解和精通这一特性，你便会意识到 Git 是如此的强大而又独特，并且从此真正改变你的开发方式。

## 分支简介
*假设:* 现在有一个工作目录，里面包含了三个将要被暂存和提交的文件。
1. 暂存操作: 
    - 为每一个文件计算校验和
    - 把当前版本的文件快照保存到 Git 仓库中（Git 使用blob对象来保存它们)
    - 将校验和加入到暂存区域等待提交：  
`$ git add README test.rb LICENSE`  
`$ git commit -m 'The initial commit of my project'`  
2. 提交操作: 
    - Git 会先计算每一个子目录的校验和
    - 在 Git 仓库中这些校验和保存为树对象
    - Git 便会创建一个提交对象，它除了包含上面提到的那些信息外，还包含指向这个树对象（项目根目录）的指针。如此一来，Git 就可以在需要的时候重现此次保存的快照。

现在，Git 仓库中有五个对象：
- 三个 blob 对象（保存着文件快照）
- 一个树对象（记录着目录结构和 blob 对象索引）
- 一个提交对象（包含着指向前述树对象的指针和所有提交信息）  

Figure 9. 首次提交对象及其树结构
![Figure 9. 首次提交对象及其树结构](branching-1-commit-and-tree.png)
做些修改后再次提交，那么这次产生的提交对象会包含一个指向上次提交对象（父对象）的指针。  
Figure 10. 提交对象及其父对象  
![Figure 10. 提交对象及其父对象](branching-2-commits-and-parents.png)

**Git 的分支，其实本质上仅仅是指向提交对象的可变指针。 Git 的默认分支名字是 master。 在多次提交操作之后，你其实已经有一个指向最后那个提交对象的 master 分支。 它会在每次的提交操作中自动向前移动。**

>Note
Git 的 `master` 分支并不是一个特殊分支。  

Figure 11. 分支及其提交历史
![Figure 11. 分支及其提交历史](branching-3-branch-and-history.png)

### 分支创建

`$ git branch testing`  
两个指向相同提交历史的分支
![Figure 12. 两个指向相同提交历史的分支](branching-4-two-branches.png)

_Git 又是怎么知道当前在哪一个分支上呢？_  
它有一个名为 HEAD 的特殊指针。它是一个指针，指向当前所在的本地分支（将 HEAD 想象为当前分支的别名）。 在本例中，你仍然在 master 分支上。 因为 git branch 命令仅仅创建一个新分支，并不会自动切换到新分支中去。

![Figure 13. HEAD 指向当前所在的分支](branching-5-head-to-master.png)

查看各个分支当前所指的对象：
```
$ git log --oneline --decorate
f30ab (HEAD, master, testing) add feature #32 - ability to add new
34ac2 fixed bug #1328 - stack overflow under certain conditions
98ca9 initial commit of my project
```
### 分支切换
$ git checkout testing
这样 HEAD 就指向 testing 分支了。

Figure 14. HEAD 指向当前所在的分支
![Figure 14. HEAD 指向当前所在的分支](branching-6-head-to-testing.png)


**那么，这样的实现方式会给我们带来什么好处呢？ 现在不妨再提交一次：**
```
$ vim test.rb
$ git commit -a -m 'made a change'
```
Figure 15. HEAD 分支随着提交操作自动向前移动
![Figure 15. HEAD 分支随着提交操作自动向前移动](branching-7-advance-testing.png)

**切回master**  
`$ git checkout master`  
Figure 16. 检出时 HEAD 随之移动
![Figure 16. 检出时 HEAD 随之移动](branching-8-checkout-master.png)

>在切换分支时，一定要注意你工作目录里的文件会被改变。 如果是切换到一个较旧的分支，你的工作目录会恢复到该分支最后一次提交时的样子。 如果 Git 不能干净利落地完成这个任务，它将禁止切换分支。


>建一个新分支就相当于往一个文件中写入 41 个字节（40 个字符和 1 个换行符）
