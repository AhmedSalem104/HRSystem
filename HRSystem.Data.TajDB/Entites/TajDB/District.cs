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
    
    public partial class District
    {
        public short DistrictId { get; set; }
        public string DistrictName { get; set; }
        public short CityId { get; set; }
    
        public virtual City City { get; set; }
    }
}
