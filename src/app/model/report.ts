import { Evidence } from "./evidence";
import { Reason } from "./reason";
import { User } from "./user.model";

export class Report {
    id: number;
    reason?: Reason;
    userByReportedId: User;
    userByReporterId: User;
    description: string;
    createdAt: string;
    status: string;
    evidences:  Evidence[];

    constructor(report) {
        this.id = report.id;
        this.reason = report.reason.name;
        this.userByReportedId = report.userByReportedId.fullname;
        this.userByReporterId = report.userByReporterId.fullname;
        this.description = report.description;
        this.createdAt = new Date(report.createdAt).toISOString().split('T')[0];
        this.status = report.status;
        this.evidences= report.evidences;
    }
}