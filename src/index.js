import ReactDOM from 'react-dom';
import React from 'react';
import './index.css'


class AddTask extends React.Component{
    
        // main functionality of constructor is to create state
        constructor(props){
            super(props);
            this.state={
                taskDesc:''
            };
        }
         handleAddTaskClick(){
            this.props.handlerToCollectTaskInfo(this.state.taskDesc);
            this.setState({
                taskDesc:''
            })
        }
         handleTaskTextChange(e){
            this.setState({
                taskDesc: e.target.value
            });
        }
        
        render(){
        return(
            <form>
            <input type="text" value={this.state.taskDesc} onChange={(e)=>this.handleTaskTextChange(e)}/>
            <input type="button" value="Add Task" onClick={()=>this.handleAddTaskClick()}/>
            
            </form>
        ) 

    }
}

class TaskList extends React.Component{

    handleTaskClick(taskDesc){
        this.props.handlerToCollectTaskClickInfo(taskDesc);
    }
    render(){
        let lists=[];

        for(let i=0;i<this.props.tasks.length;i++){
            let task=this.props.tasks[i];
            let spanAction;
            if(task.isFinished==true){
                spanAction=(
                    <span class="material-icons" onClick={()=>this.handleTaskClick(task.desc)}> close</span>
                );
            }else{
                spanAction=(
                    <span class="material-icons" onClick={()=>this.handleTaskClick(task.desc)}>done</span>
                );
            }
            let listItem=(<div key={i}>
                <span>{task.desc}</span>
                {spanAction}
            </div>);
            lists.push(listItem);
        }
        return(
        <div className={this.props.forStyling}>
            <div className="list-container">
            <div className='title'>{this.props.purpose}</div>
                <div className='content'>
                        {lists}
                </div>    
            </div>
        </div>
        );    
    }
}
class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tasks:[]
        }
    }
    handleNewTask(taskDesc){
        let oldTasks=this.state.tasks.slice();
        oldTasks.push({
            desc: taskDesc,
            isFinished: false
        });
        this.setState({tasks: oldTasks})
    }
    handleTaskStatusUpdate(taskDesc,statusUpdate){
        let oldtasks=this.state.tasks.slice();
        let task=oldtasks.find(ot=>ot.desc==taskDesc);
        task.isFinished=statusUpdate;
        this.setState({
            tasks:oldtasks
        })
    }

    render(){
        let tasks=this.state.tasks;
        let toDoTasks=tasks.filter(a=>a.isFinished==false);
        let finishedTasks=tasks.filter(a=>a.isFinished==true);
        return (
            <>
            <div className="add-task">
                <AddTask handlerToCollectTaskInfo={(taskDesc)=>this.handleNewTask(taskDesc)}/>   
            </div>
            
            {/* this is part is called jsx. html code where we can write javascript functions */}
            <div className="task-lists">
            <TaskList handlerToCollectTaskClickInfo={(taskDesc)=>this.handleTaskStatusUpdate(taskDesc,true)} tasks={toDoTasks} purpose="ToDO" forStyling="todo" />
            <TaskList handlerToCollectTaskClickInfo={(taskDesc)=>this.handleTaskStatusUpdate(taskDesc,false)} tasks={finishedTasks} purpose="finished-Tasks" forStyling="finished"/>
            </div>
            </>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));



