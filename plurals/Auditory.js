export class Auditory {
    constructor(auditoryId, auditoryNumber, auditoryCapacity, auditoryType) {
        this._auditoryId = auditoryId;
        this._auditoryNumber = auditoryNumber;
        this._auditoryCapacity = auditoryCapacity;
        this._auditoryType = auditoryType
    }

    getAuditoryID() {
        return this._auditoryId
    }

    setAuditoryID(id) {
        this._auditoryId = id
    }

    getAuditoryNumber() {
        return this._auditoryNumber
    }

    setAuditoryNumber(num) {
        this._auditoryNumber = num
    }

    getAuditoryCapacity() {
        return this._auditoryCapacity
    }

    setAuditoryCapacity(capacity) {
        this._auditoryCapacity = capacity
    }

    getAuditoryType() {
        return this._auditoryType
    }

    setAuditoryType(type) {
        this._auditoryType = type
    }


}
