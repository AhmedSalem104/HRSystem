namespace MaintenanceSystem.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addrelationInCarEntity : DbMigration
    {
        public override void Up()
        {
            CreateIndex("GL.Cars", "ColorId");
            AddForeignKey("GL.Cars", "ColorId", "Gl.Colors", "ColorId");
        }
        
        public override void Down()
        {
            DropForeignKey("GL.Cars", "ColorId", "Gl.Colors");
            DropIndex("GL.Cars", new[] { "ColorId" });
        }
    }
}
