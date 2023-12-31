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
    
    public partial class AbsenceDeduct
    {
        [SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public AbsenceDeduct()
        {
            this.AbsenceDeductEmps = new HashSet<AbsenceDeductEmp>();
        }
    
        public short Year { get; set; }
        public byte Month { get; set; }
        public DateTime Date { get; set; }
        public string DateH { get; set; }
        public string DecisionNo { get; set; }
        public DateTime FromDate { get; set; }
        public string FromDateH { get; set; }
        public DateTime ToDate { get; set; }
        public string ToDateH { get; set; }
        public string Notes { get; set; }
        public string LetterNo { get; set; }
        public Nullable<DateTime> LetterDate { get; set; }
        public string LetterDateH { get; set; }
        public string DeciesionNum { get; set; }
    
        [SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AbsenceDeductEmp> AbsenceDeductEmps { get; set; }
    }
}
