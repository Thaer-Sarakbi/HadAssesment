export type User = {
    id: string,
    name: string,
    email: string,
    password: string,
    mobile: string
}

export type Task = {
    id: string,
    assignedTo: string,
    creationDate: string,
    duration: number,
    status: string,
    title: string,
    location: string
}

export type  tasks = {
    data: Array<Task>,
    status: string,
    error: string | undefined
}