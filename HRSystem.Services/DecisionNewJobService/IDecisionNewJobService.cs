using HRSystem.Data.Entites.Payroll;
using HRSystem.Services.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.DecisionNewJobService
{
   public interface IDecisionNewJobService

    {
        List<DecisionNewJobDTO> GetAll();
        int? GetMaxDecisionNewJobCode();
        DecisionNewJob GetDecisionNewJobById(int? id);

        //List<DecisionNewJob> CheckDriverNo(int? DecisionNewJobNo);
        List<Owner> GetOwnerList();
        bool Insert(DecisionNewJob DecisionNewJob);
        bool Update(DecisionNewJob DecisionNewJob);
        bool Delete(int id);

        string AddDaysToDate(DateTime dateTime, int days);

        //List<DecisionNewJob> GetDecisionNewJobByIdForPrint(int id);
        //List<DecisionNewJob> GetAllListForPrint();

        

        EmployeeInfoDTO GetEmployeeDetailsById(int? id);

        int GetMaxId();

        //List<DecisionNewJob> GetBranchList();
        //List<DecisionNewJob> GetLicenseTypeList();





        //List<DecisionNewJob> GetDriverDetailsForPrintReport(DateTime? EndDate, int? BranchId);
        List<DecisionNewJobDTO> GetDecisionNewJobForPrint(int[] ids);
        //List<DecisionNewJob> SearchListForPrint();


        //int DriverHaveCar(int DriverID);


    }
}
