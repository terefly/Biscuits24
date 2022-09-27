export interface TitlesInterface {[key: string]: string}
export interface DealsInterface {
    id: string,
    title: string,
    phone: string,
    money: string,
    tasks: TaskInterface[],
    responsible: PersonnelInterface | undefined,
    stage: string,
}
export interface PersonnelInterface {
    id: string,
    name: string,
    lastname: string,
    phone: string,
}
export interface TaskInterface {
    id: string,
    isDone: boolean,
    description: string,
    deadline: string,
    responsible: PersonnelInterface | undefined,
}
export interface TaskListConfig {
    showOnlyLateTasks: boolean;
    showOnlyNotComlited: boolean;
}