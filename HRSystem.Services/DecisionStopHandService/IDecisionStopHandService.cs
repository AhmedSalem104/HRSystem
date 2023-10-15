using HRSystem.Data.Entites.Payroll;
using HRSystem.Services.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.DecisionStopHandService
{
   public interface IDecisionStopHandService

    {
        List<DecisionStopHandDTO> GetAll();
        int? GetMaxDecisionStopHandCode();
        DecisionStopHand GetDecisionStopHandById(int? id);

        //List<DecisionStopHand> CheckDriverNo(int? DecisionStopHandNo);

        bool Insert(DecisionStopHand DecisionStopHand);
        bool Update(DecisionStopHand DecisionStopHand);
        bool Delete(int id);

        string AddDaysToDate(DateTime dateTime, int days);

        //List<DecisionStopHand> GetDecisionStopHandByIdForPrint(int id);
        //List<DecisionStopHand> GetAllListForPrint();

        List<Owner> GetOwnerList();


        EmployeeInfoDTO GetEmployeeDetailsById(int? id);

        int GetMaxId();

        //List<DecisionStopHand> GetBranchList();
        //List<DecisionStopHand> GetLicenseTypeList();





        //List<DecisionStopHand> GetDriverDetailsForPrintReport(DateTime? EndDate, int? BranchId);
        List<DecisionStopHandDTO> GetDecisionStopHandForPrint(int[] ids);
        //List<DecisionStopHand> SearchListForPrint();


        //int DriverHaveCar(int DriverID);


    }
}
