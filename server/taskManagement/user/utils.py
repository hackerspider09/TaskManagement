

import time
from core import models as coreModel



def calcOthersPerformance(memberQuery):

    data = {'totalTask':0,
            'completedTask':0,
            'incompleteTask':0
            }

    for query in memberQuery:
        channelQuery = coreModel.Channel.objects.get(id=query.channel)
        taskToChannelQuery = coreModel.Task.objects.filter(channel=channelQuery)

        completedTask = taskToChannelQuery.filter(status='completed')
        incompleteTask = taskToChannelQuery.count() - completedTask.count()

        data['totalTask'] = data['totalTask'] +taskToChannelQuery.count()
        data['completedTask'] = data['completedTask'] + completedTask.count()
        data['incompleteTask'] = data['incompleteTask'] + incompleteTask

    return data

    # return {totalTaskAssigedTo,completedTask,incompleteTask}

def calcOwnPerformance(taskAssignedtouser):
    totalTaskAssigedTo = taskAssignedtouser.count()
    completedTask = taskAssignedtouser.filter(status='completed').count()
    incompleteTask= totalTaskAssigedTo- completedTask

    return {'totalTask':totalTaskAssigedTo,'completedTask':completedTask,'incompleteTask':incompleteTask}

