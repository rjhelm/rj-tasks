import React from "react";
import axios from "../../axios";
import MaterialTable from 'material-table'

class MaterialTableDemo extends React.Component {
    state = {
        columns: [
            { title: "Description", field: "description" },
            {
                title: "Date",
                field: "createdAt",
                editable: "never",
                render: (rowData) => {
                    if (rowData) {
                        const { createdAt } = rowData;
                        const date = new Date(createdAt);
                        return date.toLocaleString();
                    }
                }
            },
            {
                title: "Status",
                field: "completed",
                render: (rowData) => {
                    return rowData.completed === true ? "Completed" : "Ongoing";
                },
                lookup: { false: "Ongoing", true: "Completed" }
            }
        ],
        tasks: [],
        token: null
    };
    componentDidMount() {
        const token = window.localStorage.getItem("token");
        axios.get("/tasks", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res.data);
            const tasks = res.data;
            this.setState({ tasks, token });
        }).catch((err) => {
            console.log(err);
        });
    }

    // * Add Task *
    addTask = ({ description, completed }) => {
        const { token } = this.state;
        axios.post("/tasks", { description, completed }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then((res) => {
            const newTask = res.data;
            const tasks = [...this.state.tasks];
            tasks.push(newTask);
            this.setState({ tasks });
        }).catch((err) => {
            console.log(err);
        });
    };

    // * Update Task *
    updateTask = ({ newData }) => {
        const { token } = this.state;
        const { description, completed, _id } = newData;
        axios
            .patch(
                `/tasks/${_id}`,
                { description, completed },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            )
            .then((res) => {
                const { description, completed } = res.data;
                const oldTasks = [...this.state.tasks];
                const tasks = oldTasks.map((task) =>
                    task._id === _id ? { ...task, description, completed } : task
                );
                this.setState({ tasks });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // * Delete Task *
    deleteTask = ({ _id }) => {
        const { token } = this.state;
        axios
            .delete(`/tasks/${_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                const oldTasks = [...this.state.tasks];
                const tasks = oldTasks.filter((task) => _id !== task._id);
                this.setState({ tasks });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        // return (
        //   <TasksContext>
        //     {({ error, tasks, user, addTask, deleteTask, updateTask }) => {
        return (
            <MaterialTable
                title="Tasks"
                columns={this.state.columns}
                data={this.state.tasks}
                editable={{
                    // * Add Task *
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                const data = [...this.state.tasks];
                                const { description, completed } = newData;
                                data.push(newData);
                                this.setState({ ...this.state, data });
                                this.addTask({ description, completed });
                            }, 600);
                        }),
                    // * Update Task *
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                const data = [...this.state.tasks];
                                data[data.indexOf(oldData)] = newData;
                                this.setState({ ...this.state, data });
                                this.updateTask({ newData });
                            }, 600);
                        }),
                    // * Delete Task *
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                const data = [...this.state.tasks];
                                const { _id } = oldData;
                                data.splice(data.indexOf(oldData), 1);
                                this.setState({ ...this.state, data });
                                this.deleteTask({ _id });
                            }, 600);
                        })
                }}
            />
        );
        //     }}
        //   </TasksContext>
        // );
    }
}

export default MaterialTableDemo;