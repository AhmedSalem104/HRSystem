using HRSystem.Data.Entites.Payroll;
using HRSystem.Services.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.DecisionLongLegationService
{
   public interface IDecisionLongLegationService

    {
        List<DecisionLongLegationDTO> GetAll();
        int? GetMaxDecisionLongLegationCode();
        DecisionLongLegation GetDecisionLongLegationById(int? id);

        //List<DecisionLongLegation> CheckDriverNo(int? DecisionLongLegationNo);

        bool Insert(DecisionLongLegation DecisionLongLegation);
        bool Update(DecisionLongLegation DecisionLongLegation);
        bool Delete(int id);

        string AddDaysToDate(DateTime dateTime, int days);

        //List<DecisionLongLegation> GetDecisionLongLegationByIdForPrint(int id);
        //List<DecisionLongLegation> GetAllListForPrint();

        

        EmployeeInfoDTO GetEmployeeDetailsById(int? id);

        int GetMaxId();

        //List<DecisionLongLegation> GetBranchList();
        //List<DecisionLongLegation> GetLicenseTypeList();





        //List<DecisionLongLegation> GetDriverDetailsForPrintReport(DateTime? EndDate, int? BranchId);
        List<DecisionLongLegationDTO> GetDecisionLongLegationForPrint(int[] ids);
        //List<DecisionLongLegation> SearchListForPrint();


        //int DriverHaveCar(int DriverID);


    }
}
