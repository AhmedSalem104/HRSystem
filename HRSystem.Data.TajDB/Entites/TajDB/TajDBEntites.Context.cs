﻿//------------------------------------------------------------------------------
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
    using global::System.Data.Entity;
    using global::System.Data.Entity.Infrastructure;
    using global::System.Data.Entity.Core.Objects;
    using global::System.Linq;
    
    public partial class TajDBEntities : DbContext
    {
        public TajDBEntities()
            : base("name=TajDBEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<C__EFMigrationsHistory> C__EFMigrationsHistory { get; set; }
        public virtual DbSet<ActionsLog> ActionsLogs { get; set; }
        public virtual DbSet<BlackList> BlackLists { get; set; }
        public virtual DbSet<BlackListPaus> BlackListPauses { get; set; }
        public virtual DbSet<BlackListReason> BlackListReasons { get; set; }
        public virtual DbSet<Branch> Branches { get; set; }
        public virtual DbSet<BranchesPerm> BranchesPerms { get; set; }
        public virtual DbSet<City> Cities { get; set; }
        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<CustomersImage> CustomersImages { get; set; }
        public virtual DbSet<District> Districts { get; set; }
        public virtual DbSet<Menu> Menus { get; set; }
        public virtual DbSet<MonthsName> MonthsNames { get; set; }
        public virtual DbSet<MyDate> MyDates { get; set; }
        public virtual DbSet<Nationality> Nationalities { get; set; }
        public virtual DbSet<OrderType> OrderTypes { get; set; }
        public virtual DbSet<PaymentItem> PaymentItems { get; set; }
        public virtual DbSet<PhoneGroup> PhoneGroups { get; set; }
        public virtual DbSet<PhoneIndex> PhoneIndexes { get; set; }
        public virtual DbSet<Religion> Religions { get; set; }
        public virtual DbSet<Reminder> Reminders { get; set; }
        public virtual DbSet<SearchField> SearchFields { get; set; }
        public virtual DbSet<SendSm> SendSms { get; set; }
        public virtual DbSet<SendSmsCustomer> SendSmsCustomers { get; set; }
        public virtual DbSet<SerialNumber> SerialNumbers { get; set; }
        public virtual DbSet<Setting> Settings { get; set; }
        public virtual DbSet<SmsMessage> SmsMessages { get; set; }
        public virtual DbSet<SmsType> SmsTypes { get; set; }
        public virtual DbSet<SocialState> SocialStates { get; set; }
        public virtual DbSet<sysdiagram> sysdiagrams { get; set; }
        public virtual DbSet<System> Systems { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UsersEmployee> UsersEmployees { get; set; }
        public virtual DbSet<UsersPerm> UsersPerms { get; set; }
        public virtual DbSet<UsrGroup> UsrGroups { get; set; }
        public virtual DbSet<UsrGroupsPerm> UsrGroupsPerms { get; set; }
        public virtual DbSet<VatRatio> VatRatios { get; set; }
        public virtual DbSet<BlackListOld> BlackListOlds { get; set; }
        public virtual DbSet<AccountMain> AccountMains { get; set; }
        public virtual DbSet<AccountSub> AccountSubs { get; set; }
        public virtual DbSet<BlackListSerial> BlackListSerials { get; set; }
        public virtual DbSet<QryBranchesPerm> QryBranchesPerms { get; set; }
        public virtual DbSet<QryUsersPerm> QryUsersPerms { get; set; }
        public virtual DbSet<SystemsUser> SystemsUsers { get; set; }
    
        public virtual int sp_alterdiagram(string diagramname, Nullable<int> owner_id, Nullable<int> version, byte[] definition)
        {
            var diagramnameParameter = diagramname != null ?
                new ObjectParameter("diagramname", diagramname) :
                new ObjectParameter("diagramname", typeof(string));
    
            var owner_idParameter = owner_id.HasValue ?
                new ObjectParameter("owner_id", owner_id) :
                new ObjectParameter("owner_id", typeof(int));
    
            var versionParameter = version.HasValue ?
                new ObjectParameter("version", version) :
                new ObjectParameter("version", typeof(int));
    
            var definitionParameter = definition != null ?
                new ObjectParameter("definition", definition) :
                new ObjectParameter("definition", typeof(byte[]));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_alterdiagram", diagramnameParameter, owner_idParameter, versionParameter, definitionParameter);
        }
    
        public virtual int sp_creatediagram(string diagramname, Nullable<int> owner_id, Nullable<int> version, byte[] definition)
        {
            var diagramnameParameter = diagramname != null ?
                new ObjectParameter("diagramname", diagramname) :
                new ObjectParameter("diagramname", typeof(string));
    
            var owner_idParameter = owner_id.HasValue ?
                new ObjectParameter("owner_id", owner_id) :
                new ObjectParameter("owner_id", typeof(int));
    
            var versionParameter = version.HasValue ?
                new ObjectParameter("version", version) :
                new ObjectParameter("version", typeof(int));
    
            var definitionParameter = definition != null ?
                new ObjectParameter("definition", definition) :
                new ObjectParameter("definition", typeof(byte[]));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_creatediagram", diagramnameParameter, owner_idParameter, versionParameter, definitionParameter);
        }
    
        public virtual int sp_dropdiagram(string diagramname, Nullable<int> owner_id)
        {
            var diagramnameParameter = diagramname != null ?
                new ObjectParameter("diagramname", diagramname) :
                new ObjectParameter("diagramname", typeof(string));
    
            var owner_idParameter = owner_id.HasValue ?
                new ObjectParameter("owner_id", owner_id) :
                new ObjectParameter("owner_id", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_dropdiagram", diagramnameParameter, owner_idParameter);
        }
    
        public virtual int sp_helpdiagramdefinition(string diagramname, Nullable<int> owner_id)
        {
            var diagramnameParameter = diagramname != null ?
                new ObjectParameter("diagramname", diagramname) :
                new ObjectParameter("diagramname", typeof(string));
    
            var owner_idParameter = owner_id.HasValue ?
                new ObjectParameter("owner_id", owner_id) :
                new ObjectParameter("owner_id", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_helpdiagramdefinition", diagramnameParameter, owner_idParameter);
        }
    
        public virtual int sp_helpdiagrams(string diagramname, Nullable<int> owner_id)
        {
            var diagramnameParameter = diagramname != null ?
                new ObjectParameter("diagramname", diagramname) :
                new ObjectParameter("diagramname", typeof(string));
    
            var owner_idParameter = owner_id.HasValue ?
                new ObjectParameter("owner_id", owner_id) :
                new ObjectParameter("owner_id", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_helpdiagrams", diagramnameParameter, owner_idParameter);
        }
    
        public virtual int sp_renamediagram(string diagramname, Nullable<int> owner_id, string new_diagramname)
        {
            var diagramnameParameter = diagramname != null ?
                new ObjectParameter("diagramname", diagramname) :
                new ObjectParameter("diagramname", typeof(string));
    
            var owner_idParameter = owner_id.HasValue ?
                new ObjectParameter("owner_id", owner_id) :
                new ObjectParameter("owner_id", typeof(int));
    
            var new_diagramnameParameter = new_diagramname != null ?
                new ObjectParameter("new_diagramname", new_diagramname) :
                new ObjectParameter("new_diagramname", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_renamediagram", diagramnameParameter, owner_idParameter, new_diagramnameParameter);
        }
    
        public virtual int sp_upgraddiagrams()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_upgraddiagrams");
        }
    }
}
