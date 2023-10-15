using HRSystem.Data.Entites.Payroll;
using HRSystem.Services.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.DecisionEndStopHandService
{
   public interface IDecisionEndStopHandService

    {
        List<DecisionEndStopHandDTO> GetAll();
        int? GetMaxDecisionEndStopHandCode();
        DecisionEndStopHand GetDecisionEndStopHandById(int? id);

        //List<DecisionEndStopHand> CheckDriverNo(int? DecisionEndStopHandNo);
        //List<DecisionStopHand> GetEmployeeList();
        List<EmployeeListForDecisionEndStopHandDTO> GetEmployeeList();


        bool Insert(DecisionEndStopHand DecisionEndStopHand);
        bool Update(DecisionEndStopHand DecisionEndStopHand);
        bool Delete(int id);

        string AddDaysToDate(DateTime dateTime, int days);

        //List<DecisionEndStopHand> GetDecisionEndStopHandByIdForPrint(int id);
        //List<DecisionEndStopHand> GetAllListForPrint();

        List<Owner> GetOwnerList();


        EmployeeInfoDTO GetEmployeeDetailsById(int? id);

        int GetMaxId();

        //List<DecisionEndStopHand> GetBranchList();
        //List<DecisionEndStopHand> GetLicenseTypeList();





        //List<DecisionEndStopHand> GetDriverDetailsForPrintReport(DateTime? EndDate, int? BranchId);
        List<DecisionEndStopHandDTO> GetDecisionEndStopHandForPrint(int[] ids);
        //List<DecisionEndStopHand> SearchListForPrint();


        //int DriverHaveCar(int DriverID);


    }
}
