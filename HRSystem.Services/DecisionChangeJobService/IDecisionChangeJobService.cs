using HRSystem.Data.Entites.Payroll;
using HRSystem.Services.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.DecisionChangeJobService
{
   public interface IDecisionChangeJobService

    {
        List<DecisionChangeJobDTO> GetAll();
        int? GetMaxDecisionChangeJobCode();
        DecisionChangeJob GetDecisionChangeJobById(int? id);

        //List<DecisionLongLegation> CheckDriverNo(int? DecisionLongLegationNo);

        bool Insert(DecisionChangeJob DecisionChangeJob);
        bool Update(DecisionChangeJob DecisionChangeJob);
        bool Delete(int id);

        string AddDaysToDate(DateTime dateTime, int days);

        //List<DecisionLongLegation> GetDecisionLongLegationByIdForPrint(int id);
        //List<DecisionLongLegation> GetAllListForPrint();

       

        EmployeeInfoDTO GetEmployeeDetailsById(int? id);

        int GetMaxId();

        //List<DecisionLongLegation> GetBranchList();
        //List<DecisionLongLegation> GetLicenseTypeList();

        List<Department> GetDepartmentList();




        //List<DecisionLongLegation> GetDriverDetailsForPrintReport(DateTime? EndDate, int? BranchId);
        List<GetDecisionChangeJobForPrint_Result> GetDecisionChangeJobForPrint(int[] ids);
        //List<DecisionLongLegation> SearchListForPrint();


        //int DriverHaveCar(int DriverID);


    }
}
