//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace HRSystem.Data.Entites.Payroll
{
    using global::System;  using global::System.Diagnostics.CodeAnalysis;
    using global::System.Collections.Generic;
    
    public partial class EmployeesUserName
    {
        public int EmpID { get; set; }
        public string UserId { get; set; }
        public bool Manager { get; set; }
        public Nullable<int> CurrentManagementId { get; set; }
        public bool Personnel { get; set; }
        public Nullable<int> DelegatedDepartmentID { get; set; }
        public bool PermissionsManager { get; set; }
        public bool AddVacationApplication { get; set; }
        public bool ApproveVacation { get; set; }
        public bool ApproveLegations { get; set; }
        public bool Chef { get; set; }
        public bool UpdateSalaryInfo { get; set; }
        public bool UpdateHisAttendance { get; set; }
        public Nullable<int> AttendanceGroupId { get; set; }
        public bool EltezamPerm { get; set; }
        public bool LegationEmp { get; set; }
        public bool TrainingEmp { get; set; }
        public bool OutOfDutyEmp { get; set; }
    
        public virtual Employee Employee { get; set; }
    }
}
