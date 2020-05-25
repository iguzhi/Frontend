# Git 修改 commit 的作者信息

## 问题
在公司和宿舍使用不同的 git 邮箱账号，结果 commit 的时候忘记修改配置导致 commit 的个人名称和邮箱都不对

## 解决方法
修改 git 配置
* `git config --global user.email "youremail@googl.com"`
* `git config --global user.name "your name"`
但是补救措施只对以后的 commit 起效, 如果想修改之前的作者信息，Github 给出了官方指南：Changing author info

## 修复 git 历史提交信息
To change the name and/or email address recorded in existing commits, you must rewrite the entire history of your Git repository.

为了修改 commit 的作者邮箱地址，你必须重写整个 git 仓库历史

Warning: `This action is destructive to your repository's history. If you're collaborating on a repository with others, it's considered bad practice to rewrite published history. You should only do this in an emergency.`

警告： `这个操作会破坏你的仓库历史， 如果你和别人在协同开发这个仓库，重写已发布的历史记录是一个不好的操作。建议只在紧急情况操作`

## 操作步骤：
打开 bash

* Create a fresh, bare clone of your repository: （新建一个全新的仓库信息：)

    git clone --bare https://github.com/user/repo.git
    cd repo.git
* Copy and paste the script, replacing the following variables based on the information you gathered: (在终端复制并粘贴以下脚本，并将以下的变量修改为你需要的)

****OLD_EMAIL****
****CORRECT_NAME****
****CORRECT_EMAIL****

脚本信息：
```
#!/bin/sh

git filter-branch --env-filter '

OLD_EMAIL="your-old-email@example.com"
CORRECT_NAME="Your Correct Name"
CORRECT_EMAIL="your-correct-email@example.com"

if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```

* Press Enter to run the script.（按下 enter 键来运行这个脚本

* Review the new Git history for errors.(校对新的 git 仓库历史）

* Push the corrected history to GitHub:（将修改后的仓库历史推到远程）

`git push --force --tags origin 'refs/heads/*'`
* Clean up the temporary clone: (删除这个仓库)

`cd ..`
`rm -rf repo.git`
