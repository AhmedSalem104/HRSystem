using HRSystem.Data.Entites.Payroll;

using HRSystem.Services.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.DecisionEmploymentService
{
   public interface IDecisionEmploymentService

    {
        List<DecisionEmploymentDTO> GetAll();
        int? GetMaxDecisionEmploymentCode();
        DecisionEmployment GetDecisionEmploymentById(int? id);

        //List<DecisionLongLegation> CheckDriverNo(int? DecisionLongLegationNo);

        bool Insert(DecisionEmployment DecisionEmployment);
        bool Update(DecisionEmployment DecisionEmployment);
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

        List<GetDecisionEmploymentForPrint_Result> GetDecisionEmploymentForPrint(int[] ids);

        //List<DecisionLongLegation> SearchListForPrint();
        //int DriverHaveCar(int DriverID);


    }
}
