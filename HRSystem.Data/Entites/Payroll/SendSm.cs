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
    
    public partial class SendSm
    {
        [SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SendSm()
        {
            this.Employees = new HashSet<Employee>();
        }
    
        public byte SystemId { get; set; }
        public int Serial { get; set; }
        public DateTime Date { get; set; }
        public string DateH { get; set; }
        public byte SmsTypeId { get; set; }
        public string SmsText { get; set; }
        public string SenderId { get; set; }
        public Nullable<byte> PaySlipId { get; set; }
    
        [SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Employee> Employees { get; set; }
    }
}
