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
    
    public partial class Setting
    {
        public short BranchId { get; set; }
        public string CompanyName { get; set; }
        public string SystemDate { get; set; }
        public bool ShowCurrencies { get; set; }
        public bool ShowWeather { get; set; }
        public bool ShowNews { get; set; }
        public Nullable<byte> RefreshInterval { get; set; }
        public bool MaximizeForms { get; set; }
        public string ProdK { get; set; }
        public string SmsSender { get; set; }
        public bool SmsService { get; set; }
        public string SMS_Contracts { get; set; }
        public string SMS_Inst { get; set; }
        public string SMS_Licenses { get; set; }
        public string SMS_EndedLicenses { get; set; }
        public string SMSUser { get; set; }
        public string SMSPass { get; set; }
        public bool mobily_ws { get; set; }
        public byte[] Bg { get; set; }
        public Nullable<short> SearchRows { get; set; }
        public Nullable<short> PasswordExpDays { get; set; }
        public bool EtaSync { get; set; }
        public bool HealthSync { get; set; }
        public bool EngLicensesSync { get; set; }
        public byte SmsProvider { get; set; }
        public string SMSCollecting { get; set; }
    }
}
