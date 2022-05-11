import utils.functional

from leetcode.getNumberByAccount import *


def update():
    utils.functional.update("leetcode", lambda account : get_number(account))
