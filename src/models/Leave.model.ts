export interface ILeave {
    type: string,
    from_date: Date,
    to_date: Date,
    days: number,
    status: string,
    reason: string
}