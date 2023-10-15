using HRSystem.Data.Entites.Payroll;
using HRSystem.Services.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.DecisionWorkersService
{
   public interface IDecisionWorkersService

    {
        List<DecisionWorkerDTO> GetAll();
        int? GetMaxDecisionWorkerCode();
        DecisionWorker GetDecisionWorkerById(int? id);


        //List<DecisionLongLegation> CheckDriverNo(int? DecisionLongLegationNo);

        bool Insert(DecisionWorker DecisionWorker);
        bool Update(DecisionWorker DecisionWorker);
        bool Delete(int id);


        List<Owner> GetOwnerList();
        List<FixedJob> GetFixedJobList();
        List<FixedJob> FixedJobRow(int? id);



        //string AddDaysToDate(DateTime dateTime, int days);

        //List<DecisionLongLegation> GetDecisionLongLegationByIdForPrint(int id);
        //List<DecisionLongLegation> GetAllListForPrint();


        EmployeeInfoDTO GetEmployeeDetailsById(int? id);

        int GetMaxId();

        //List<DecisionLongLegation> GetBranchList();
        //List<DecisionLongLegation> GetLicenseTypeList();





        //List<DecisionLongLegation> GetDriverDetailsForPrintReport(DateTime? EndDate, int? BranchId);
        List<GetDecisionWorkersForPrint_Result> GetDecisionWorkerForPrint(int[] ids);
        //List<DecisionLongLegation> SearchListForPrint();


        //int DriverHaveCar(int DriverID);


    }
}
