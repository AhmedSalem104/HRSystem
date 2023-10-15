namespace MaintenanceSystem.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeSomeNames : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "GL.Cars", name: "CarType", newName: "MachineTypeId");
        }
        
        public override void Down()
        {
            RenameColumn(table: "GL.Cars", name: "MachineTypeId", newName: "CarType");
        }
    }
}
