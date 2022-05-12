#!/bin/bash
#description:   make fetching data a auto-task
#usage:         bash ./autofetch.sh
#author:        rileyye@qq.com
#last-modified: 2022/5/12

echo '0 0 * * * . /etc/profile; /bin/python3 ./main.py' | crontab