export interface ILeave {
    id: string,
    type: string,
    from_date: Date,
    to_date: Date,
    days: number,
    status: string,
    reason: string
}