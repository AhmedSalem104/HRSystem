namespace MaintenanceSystem.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddRelationInDriverEntity : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "Gl.Nationalities", name: "NatId", newName: "NationalId");
            AddColumn("GL.Drivers", "NationalitiesNationalId", c => c.Int());
            CreateIndex("GL.Drivers", "NationalitiesNationalId");
            CreateIndex("GL.Drivers", "BranchesId");
            CreateIndex("GL.Suppliers", "VendorClassificationId");
            AddForeignKey("GL.Drivers", "BranchesId", "GL.Branches", "Id");
            AddForeignKey("GL.Drivers", "NationalitiesNationalId", "Gl.Nationalities", "NationalId");
            AddForeignKey("GL.Suppliers", "VendorClassificationId", "GL.VendorClassification", "Id", cascadeDelete: true);
            DropColumn("GL.Drivers", "NatId");
        }
        
        public override void Down()
        {
            AddColumn("GL.Drivers", "NatId", c => c.Int());
            DropForeignKey("GL.Suppliers", "VendorClassificationId", "GL.VendorClassification");
            DropForeignKey("GL.Drivers", "NationalitiesNationalId", "Gl.Nationalities");
            DropForeignKey("GL.Drivers", "BranchesId", "GL.Branches");
            DropIndex("GL.Suppliers", new[] { "VendorClassificationId" });
            DropIndex("GL.Drivers", new[] { "BranchesId" });
            DropIndex("GL.Drivers", new[] { "NationalitiesNationalId" });
            DropColumn("GL.Drivers", "NationalitiesNationalId");
            RenameColumn(table: "Gl.Nationalities", name: "NationalId", newName: "NatId");
        }
    }
}
