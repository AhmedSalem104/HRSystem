namespace MaintenanceSystem.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addrelationInCarEntity3 : DbMigration
    {
        public override void Up()
        {
            CreateIndex("GL.Cars", "SupplierId");
            AddForeignKey("GL.Cars", "SupplierId", "GL.Suppliers", "SupplierId");
        }
        
        public override void Down()
        {
            DropForeignKey("GL.Cars", "SupplierId", "GL.Suppliers");
            DropIndex("GL.Cars", new[] { "SupplierId" });
        }
    }
}
