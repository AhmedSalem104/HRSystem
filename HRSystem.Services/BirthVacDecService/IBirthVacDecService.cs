using HRSystem.Data.Entites.Payroll;
using HRSystem.Services.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.BirthVacDecService
{
   public interface IBirthVacDecService

    {
        List<BirthVacDec> GetAll();
        int? GetMaxBirthVacDecCode();
        BirthVacDec GetBirthVacDecById(int? id);

        //List<BirthVacDec> CheckDriverNo(int? BirthVacDecNo);
        //List<DecisionStopHand> GetEmployeeList();


        bool Insert(BirthVacDec BirthVacDec);
        bool Update(BirthVacDec BirthVacDec);
        bool Delete(int id);

        string AddDaysToDate(DateTime dateTime, int days);

        //List<BirthVacDec> GetBirthVacDecByIdForPrint(int id);
        //List<BirthVacDec> GetAllListForPrint();

        List<Owner> GetOwnerList();


        EmployeeInfoDTO GetEmployeeDetailsById(int? id);

        int GetMaxId();

        //List<BirthVacDec> GetBranchList();
        //List<BirthVacDec> GetLicenseTypeList();





        //List<BirthVacDec> GetDriverDetailsForPrintReport(DateTime? EndDate, int? BranchId);
        List<BirthVacDecDTO> GetBirthVacDecForPrint(int[] ids);

        //List<BirthVacDec> SearchListForPrint();
        //int DriverHaveCar(int DriverID);


    }
}
