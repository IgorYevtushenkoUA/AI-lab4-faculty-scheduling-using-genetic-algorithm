export class Auditory {
    constructor(auditoryId, auditoryName, auditoryCapacity, auditoryType) {
        this._auditoryId = auditoryId;
        this._auditoryName = auditoryName;
        this._auditoryCapacity = auditoryCapacity;
        this._auditoryType = auditoryType
    }

    get getAuditoryID()         {return this._auditoryId}
    get getAuditoryName()       {return this._auditoryName}
    get getAuditoryType()       {return this._auditoryType}
    get getAuditoryCapacity()   {return this._auditoryCapacity}

    set setAuditoryID(id)               {this._auditoryId = id}
    set setAuditoryName(name)           {this._auditoryName = name}
    set setAuditoryCapacity(capacity)   {this._auditoryCapacity = capacity}
    set setAuditoryType(type)           {this._auditoryType = type}
}
