using HRSystem.Data.Entites.Payroll;

using HRSystem.Services.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.DecisionAbsenceDeductionService
{
   public interface IDecisionAbsenceDeductionService

    {
        List<DecisionAbsenceDeduction> GetAll();
        int? GetMaxDecisionAbsenceDeductionCode();
        DecisionAbsenceDeduction GetDecisionAbsenceDeductionById(int? id);

        List<DecisionAbsenceDeductionDetialsDTO> GetDecisionAbsenceDeductionDetails(int? DecisionAbsenceDeductionId);
        DecisionAbsenceDeductionDetialsDTO GetDecisionAbsenceDeductionDetailsRow(int? DecisionAbsenceDeductionEmpId,int? DADID);

        //List<DecisionAbsenceDeduction> CheckDriverNo(int? DecisionAbsenceDeductionNo);
        //List<DecisionStopHand> GetEmployeeList();


        bool Insert(DecisionAbsenceDeduction DecisionAbsenceDeduction);
        bool InsertDecisionAbsenceDeductionD(List<DecisionAbsenceDeductionFooter> DecisionAbsenceDeductionDetails, int DecisionAbsenceDeductionID);

        bool Update(DecisionAbsenceDeduction DecisionAbsenceDeduction);
        bool UpdateDecisionAbsenceDeductionDetails(List<DecisionAbsenceDeductionFooter> DecisionAbsenceDeductionFooterD, int DecisionAbsenceDeductionTrxId);

        bool Delete(int id);

        string GetMonthName(int? MonthNo);
        string GetEmployeeeName(int? EmpNo);

        

        //List<DecisionAbsenceDeduction> GetDecisionAbsenceDeductionByIdForPrint(int id);
        //List<DecisionAbsenceDeduction> GetAllListForPrint();

        List<Owner> GetOwnerList();
        List<Department> GetDepartMentList();

        

        EmployeeInfoDTO GetEmployeeDetailsById(int? id);

        int GetMaxId();

        //List<DecisionAbsenceDeduction> GetBranchList();
        //List<DecisionAbsenceDeduction> GetLicenseTypeList();





        //List<DecisionAbsenceDeduction> GetDriverDetailsForPrintReport(DateTime? EndDate, int? BranchId);
        //List<DecisionAbsenceDeductionDTO> GetDecisionAbsenceDeductionForPrint(int[] ids);
        //List<DecisionAbsenceDeduction> SearchListForPrint();


        //int DriverHaveCar(int DriverID);


    }
}
