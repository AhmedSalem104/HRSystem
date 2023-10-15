using HRSystem.Data.Entites.Payroll;
using HRSystem.Services.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.DecisionMoveEmpService
{
   public interface IDecisionMoveEmpService

    {
        List<DecisionMoveEmpDTO> GetAll();
        int? GetDecisionMoveEmpCode();
        DecisionMoveEmp GetDecisionMoveEmpById(int? id);

        //List<DecisionLongLegation> CheckDriverNo(int? DecisionLongLegationNo);

        bool Insert(DecisionMoveEmp DecisionMoveEmp);
        bool Update(DecisionMoveEmp DecisionMoveEmp);
        bool Delete(int id);


        //List<DecisionLongLegation> GetDecisionLongLegationByIdForPrint(int id);
        //List<DecisionLongLegation> GetAllListForPrint();

       

        EmployeeInfoDTO GetEmployeeDetailsById(int? id);

        int GetMaxId();

        //List<DecisionLongLegation> GetBranchList();
        //List<DecisionLongLegation> GetLicenseTypeList();

        List<Department> GetDepartmentList();




        //List<DecisionLongLegation> GetDriverDetailsForPrintReport(DateTime? EndDate, int? BranchId);
        List<GetDecisionMoveEmpForPrint_Result> GetDecisionMoveEmpForPrint(int[] ids);
        //List<DecisionLongLegation> SearchListForPrint();


        //int DriverHaveCar(int DriverID);


    }
}
