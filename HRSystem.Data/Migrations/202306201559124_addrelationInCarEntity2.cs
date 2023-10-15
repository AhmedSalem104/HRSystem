namespace MaintenanceSystem.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addrelationInCarEntity2 : DbMigration
    {
        public override void Up()
        {
            CreateIndex("GL.Cars", "CarTypeId");
            AddForeignKey("GL.Cars", "CarTypeId", "Gl.CarsTypes", "CarTypeId");
        }
        
        public override void Down()
        {
            DropForeignKey("GL.Cars", "CarTypeId", "Gl.CarsTypes");
            DropIndex("GL.Cars", new[] { "CarTypeId" });
        }
    }
}
