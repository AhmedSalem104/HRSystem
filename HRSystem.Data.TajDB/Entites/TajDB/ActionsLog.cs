//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace HRSystem.DataTajDB.Entites.TajDB
{
    using global::System;  using global::System.Diagnostics.CodeAnalysis;
    using global::System.Collections.Generic;
    
    public partial class ActionsLog
    {
        public DateTime DateTime { get; set; }
        public byte SystemId { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Table { get; set; }
        public string Record { get; set; }
        public string Action { get; set; }
        public string MachineName { get; set; }
        public string FormName { get; set; }
        public string DateTimeH { get; set; }
        public int Id { get; set; }
    
        public virtual System System { get; set; }
    }
}
