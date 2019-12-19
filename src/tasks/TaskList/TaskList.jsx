import React from 'react';
import Task from './Task/Task'
import './TaskList.css';
import taskService from '../../services/tasks-service';

function TaskList(props) {
    
    const [tasks, setTasks] = React.useState(null);
    
    React.useEffect(() => {

        if(props.typeList === "open"){

            taskService.getAllTasks().then(tasks => {
                 setTasks(tasks);
             });
        }else if(props.typeList === "inProgress"){

            taskService.getTasksInProgress().then(tasks => {
                 setTasks(tasks);
             });
        }else if(props.typeList === "completed"){

            taskService.getCompletedTasks().then(tasks => {
                 setTasks(tasks);
             });
        }
        else if(props.typeList === "myTasks"){

            taskService.getUserTasks(props.userId).then(tasks => {
                 setTasks(tasks);
             });

        }else if(props.typeList === "pending"){

            taskService.getPendingTasks().then(tasks => {
                  setTasks(tasks);
              });
        }

    }, [props.typeList, props.userId]);

    return (
        <div>
            {tasks ?
                <div className="TaskList">
                    {tasks.map((task) =>
                        <Task {...props} key={task._id} id={task._id} userId={props.userId} inProgress={task.inProgress} pending={task.pendingApproval} completed={task.completedFrom} author={task.author} title={task.title} imageUrl="/logo192.png" imageAlt="alt" >Published: { new Date(task.publicationDate).toLocaleDateString() }</Task>)}
                </div> : <div>Loading...</div>
            }
        </div>
    );
};

export default TaskList;