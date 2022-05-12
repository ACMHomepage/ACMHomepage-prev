import utils.functional

from codeforces.getNumberByAccount import *

def update():
    utils.functional.update("codeforces", lambda account : get_number(account))