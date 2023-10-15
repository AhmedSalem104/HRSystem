namespace MaintenanceSystem.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addPaidInstColInCompanyInfo : DbMigration
    {
        public override void Up()
        {
            AddColumn("GL.CompanyInfo", "PaidInst", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("GL.CompanyInfo", "PaidInst");
        }
    }
}
