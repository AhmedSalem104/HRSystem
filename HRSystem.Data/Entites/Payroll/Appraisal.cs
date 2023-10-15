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
    
    public partial class Appraisal
    {
        [SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Appraisal()
        {
            this.AppraisalsDetails = new HashSet<AppraisalsDetail>();
        }
    
        public int AppraisalId { get; set; }
        public DateTime Date { get; set; }
        public string DateH { get; set; }
        public string Notes { get; set; }
        public string EltezamResponse { get; set; }
        public Nullable<byte> AppraisalType { get; set; }
        public Nullable<DateTime> FromDate { get; set; }
        public string FromDateH { get; set; }
        public Nullable<DateTime> ToDate { get; set; }
        public string ToDateH { get; set; }
    
        [SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AppraisalsDetail> AppraisalsDetails { get; set; }
    }
}