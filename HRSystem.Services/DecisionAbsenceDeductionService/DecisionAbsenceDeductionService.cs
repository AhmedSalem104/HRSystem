using HRSystem.Data;
using HRSystem.Data.Entites.Payroll;
using HRSystem.DataTajDB.Entites.TajDB;

using HRSystem.Services.DTO;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRSystem.Services.DecisionAbsenceDeductionService
{
    public class DecisionAbsenceDeductionService : IDecisionAbsenceDeductionService
    {
        #region Fields
        readonly PayrollEntities _context;
        readonly TajDBEntities _TajDbContext;

        #endregion
        #region Constructors
        public DecisionAbsenceDeductionService(PayrollEntities context)
        {
            _context = context;

        }

        #endregion


        #region Methods
        public List<DecisionAbsenceDeduction> GetAll()
        {
            _context.Configuration.ProxyCreationEnabled = false;

            var DecisionAbsenceDeductionList = _context.DecisionAbsenceDeductions.ToList();
            return DecisionAbsenceDeductionList;
            //var servicesTrxList = (from DAD in _context.DecisionAbsenceDeductions
            //                       join D in _context.Departments on DAD.DepartmentId equals D.DepartmentName
            //                       join O in _context.Owners on DAD.Owner equals O.OwnerName


            //                       select new DecisionAbsenceDeductionDTO()
            //                       {
            //                           DecisionAbsenceDeductionID = DAD.DecisionAbsenceDeductionID,
            //                           DateH = DAD.DateH,
            //                           EmpName = E.EmpName,
            //                           EnclosureCount = DAD.EnclosureCount,
            //                           Notes = DAD.Notes,
            //                           StartDateH = DAD.StartDateH,
            //                           Subject = DAD.Subject,
            //                           PublishedFrom = DAD.PublishedFrom




            //                       }).ToList();
            //return servicesTrxList;


        }

        public DecisionAbsenceDeduction GetDecisionAbsenceDeductionById(int? id)
        {
            return _context.DecisionAbsenceDeductions.Where(c => c.DecisionAbsenceDeductionID == id).FirstOrDefault();
        }

        public int? GetMaxDecisionAbsenceDeductionCode()
        {
            //return _context.Warning.Max(a => a.WarnCode) + 1;
           
            var CodeNotNull = _context.DecisionAbsenceDeductions.Count();
            if (CodeNotNull != 0)
            {
                var Code = _context.DecisionAbsenceDeductions.Max(a => a.DecisionAbsenceDeductionID);

                return (Code + 1);
            }


            else
            {
                var CodeNull = 1;
                return (CodeNull);

            }
        }



      
        public bool Insert(DecisionAbsenceDeduction DecisionAbsenceDeduction)
        {
            try
            {
                _context.DecisionAbsenceDeductions.Add(DecisionAbsenceDeduction);
                _context.SaveChanges();
                return true;

            }
            catch
            {
                return false;
            }
        }

        public bool InsertDecisionAbsenceDeductionD(List<DecisionAbsenceDeductionFooter> DecisionAbsenceDeductionDetails, int DecisionAbsenceDeductionID)
        {
            foreach (var item in DecisionAbsenceDeductionDetails)
            {
                item.DecisionAbsenceDeductionID = DecisionAbsenceDeductionID;
                _context.DecisionAbsenceDeductionFooters.Add(item);
                _context.SaveChanges();

            }
            return true;
        }




        public bool Update(DecisionAbsenceDeduction DecisionAbsenceDeduction)
        {
            try
            {


                if (DecisionAbsenceDeduction == null)
                {
                    throw new ArgumentNullException("DecisionAbsenceDeduction");
                }
                _context.Entry(DecisionAbsenceDeduction).State = EntityState.Detached;
                _context.Entry(DecisionAbsenceDeduction).State = EntityState.Modified;
                _context.SaveChanges();
                return true;

            }
            catch
            {
                return false;
            }
        }

        public bool UpdateDecisionAbsenceDeductionDetails(List<DecisionAbsenceDeductionFooter> DecisionAbsenceDeductionDetails, int DecisionAbsenceDeductionID)
        {
            List<DecisionAbsenceDeductionFooter> DecisionDetails = _context.DecisionAbsenceDeductionFooters.Where(d => d.DecisionAbsenceDeductionID == DecisionAbsenceDeductionID).ToList();
            _context.DecisionAbsenceDeductionFooters.RemoveRange(DecisionDetails);
            _context.SaveChanges();
            foreach (var item in DecisionAbsenceDeductionDetails)
            {
                item.DecisionAbsenceDeductionID = DecisionAbsenceDeductionID;
                _context.DecisionAbsenceDeductionFooters.Add(item);
                _context.SaveChanges();

            }
            return true;

        }
        public bool Delete(int id)
        {
            try
            {

                var driver = _context.DecisionAbsenceDeductions.FirstOrDefault(m => m.DecisionAbsenceDeductionID == id);
                _context.Entry(driver).State = EntityState.Deleted;
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public List<DecisionAbsenceDeductionDetialsDTO> GetDecisionAbsenceDeductionDetails(int? DecisionAbsenceDeductionId)
        {
            var DecisionAbsenceDeductionDetialsList = (from DADF in _context.DecisionAbsenceDeductionFooters
                                                       join E in _context.Employees on DADF.EmpId equals E.EmpID
                                   where DADF.DecisionAbsenceDeductionID == DecisionAbsenceDeductionId
                                                       select new DecisionAbsenceDeductionDetialsDTO()
                                   {
                                        DecisionAbsenceDeductionID = DADF.DecisionAbsenceDeductionID,
                                        AbsenceDate = DADF.AbsenceDate,
                                        DeductDays = DADF.DeductDays,
                                        AbsenceDays = DADF.AbsenceDays,
                                        DeductHours = DADF.DeductHours,
                                        DeductHoursNo = DADF.DeductHoursNo,
                                        DeductMinutes = DADF.DeductMinutes,
                                        Description = DADF.Description,
                                        EmpId = DADF.EmpId,
                                        EmpName = E.EmpName,

                                 }


                                 ).ToList();


            return DecisionAbsenceDeductionDetialsList;
        }


        public DecisionAbsenceDeductionDetialsDTO GetDecisionAbsenceDeductionDetailsRow(int? DecisionAbsenceDeductionEmpId ,int? DADID)
        {
            var DecisionAbsenceDeductionDetialsRow = (from DADF in _context.DecisionAbsenceDeductionFooters
                                                      join E in _context.Employees on DADF.EmpId equals E.EmpID
                                                      where DADF.EmpId == DecisionAbsenceDeductionEmpId & DADF.DecisionAbsenceDeductionID == DADID
                                                      select new DecisionAbsenceDeductionDetialsDTO()
                                                      {
                                                          DecisionAbsenceDeductionID = DADF.DecisionAbsenceDeductionID,
                                                          AbsenceDate = DADF.AbsenceDate,
                                                          DeductDays = DADF.DeductDays,
                                                          AbsenceDays = DADF.AbsenceDays,
                                                          DeductHours = DADF.DeductHours,
                                                          DeductHoursNo = DADF.DeductHoursNo,
                                                          DeductMinutes = DADF.DeductMinutes,
                                                          Description = DADF.Description,
                                                          EmpId = DADF.EmpId,
                                                          EmpName = E.EmpName,

                                                      }


                                 ).FirstOrDefault();


            return DecisionAbsenceDeductionDetialsRow;
        }
        public string GetMonthName(int? MonthNo)
        {
            if (MonthNo == 0)
            {
                var Value = "";
                return Value;
            }
            var Valuee = _context.GetMonthsNames().FirstOrDefault(a => a.MonthNo == MonthNo).MothHjName;
            return Valuee;
        }

        public string GetEmployeeeName(int? EmpNo)
        {
            if (EmpNo == 0)
            {
                var Value = "";
                return Value;
            }
            var Valuee = _context.Employees.FirstOrDefault(a => a.EmpID == EmpNo).EmpName;
            return Valuee;
        }

        //public List<DriverDto> GetDriverByIdForPrint(int id)
        //{
        //    var driver = (from d in _context.List
        //                  join n in _context.Nationalities on d.NationalitiesNationalId equals n.NationalId into nGroup
        //                  from n in nGroup.DefaultIfEmpty()
        //                  join lt in _context.LicenseTypes on d.LicenseTypeId equals lt.Id into ltGroup
        //                  from lt in ltGroup.DefaultIfEmpty()
        //                  join br in _context.Branches on d.BranchesId equals br.Id into brGroup
        //                  from br in brGroup.DefaultIfEmpty()
        //                  select new DriverDto()
        //                  {
        //                   Id = d.Id,
        //                   DriverName = d.DriverName,
        //                   DriverNo = (int)(d.DriverNo != null ? d.DriverNo : 0),
        //                   LicenseNo = d.LicenseNo,
        //                   LicensePlace = d.LicensePlace,
        //                   LicenseReleaseDateH = d.LicenseReleaseDateH,
        //                   LicenseEndDateH = d.LicenseEndDateH,
        //                   Phone = d.Phone,
        //                   MobileCode = d.MobileCode,
        //                   NatName = n.NatName,
        //                   LicenseTypeNameName = lt.LicenseTypeNameName,
        //                   BrancheName = br.BranchesName

        //               }).Where(a => a.Id == id).ToList();


        //    return driver;
        //}
        //public List<DriverDto> GetAllListForPrint()
        //{
        //    var driver = (from d in _context.List
        //               join n in _context.Nationalities on d.NationalitiesNationalId equals n.NationalId into nGroup
        //               from n in nGroup.DefaultIfEmpty()
        //               join lt in _context.LicenseTypes on d.LicenseTypeId equals lt.Id into ltGroup
        //               from lt in ltGroup.DefaultIfEmpty()
        //               select new DriverDto()
        //               {
        //                   Id = d.Id,
        //                   DriverName = d.DriverName,
        //                   DriverNo = (int)(d.DriverNo != null ? d.DriverNo : 0),
        //                   LicenseNo = d.LicenseNo,
        //                   LicensePlace = d.LicensePlace,
        //                   LicenseReleaseDateH = d.LicenseReleaseDateH,
        //                   LicenseEndDateH = d.LicenseEndDateH,
        //                   Phone = d.Phone,
        //                   MobileCode = d.MobileCode,
        //                   NatName = n.NatName,
        //                   LicenseTypeNameName = lt.LicenseTypeNameName,


        //               }).ToList();


        //    return driver;
        //}




        //public List<LicenseTypes_Tbl> GetLicenseTypeList()
        //{
        //    return _context.LicenseTypes.Where(a => a.IsDeleted == false).ToList();
        //}
        //public List<Nationalities> GetNationalList()
        //{
        //    return _context.Nationalities.Where(a => a.IsDeleted == false).ToList();
        //}





        //public List<List> CheckDriverNo(int? DriverNo)
        //{
        //    return _context.List.Where(a => a.DriverNo == DriverNo & a.IsDeleted == false).ToList();
        //}


        //public DriverDto GetDriverDetailsById(int id)
        //{
        //    var driver = (from d in _context.List
        //                  join n in _context.Nationalities on d.NationalitiesNationalId equals n.NationalId into nGroup
        //                  from n in nGroup.DefaultIfEmpty()
        //                  join lt in _context.LicenseTypes on d.LicenseTypeId equals lt.Id into ltGroup
        //                  from lt in ltGroup.DefaultIfEmpty()
        //                  join br in _context.Branches on d.BranchesId equals br.Id into brGroup
        //                  from br in brGroup.DefaultIfEmpty()
        //                  select new DriverDto()
        //                  {
        //                      Id = d.Id,
        //                      DriverName = d.DriverName,
        //                      DriverNo = (int)(d.DriverNo != null ? d.DriverNo : 0),
        //                      LicenseNo = d.LicenseNo,
        //                      LicensePlace = d.LicensePlace,
        //                      LicenseReleaseDateH = d.LicenseReleaseDateH,
        //                      LicenseEndDateH = d.LicenseEndDateH,
        //                      Phone = d.Phone,
        //                      MobileCode = d.MobileCode,
        //                      NatName = n.NatName,
        //                      LicenseTypeNameName = lt.LicenseTypeNameName,
        //                      BrancheName = br.BranchesName

        //                  }).FirstOrDefault(a => a.Id == id);


        //    return driver;
        //}


        //public List<DriverDto> GetDriverDetailsForPrintReport(DateTime? EndDate, int? BranchId)
        //{
        //    var Licence = (from D in _context.List
        //                    join B in _context.Branches on D.BranchesId equals B.Id into BGroup
        //                    from B in BGroup.DefaultIfEmpty()
        //                    join N in _context.Nationalities on D.NationalitiesNationalId equals N.NationalId into NGroup
        //                    from N in NGroup.DefaultIfEmpty()
        //                    join LT in _context.LicenseTypes on D.LicenseTypeId equals LT.Id into LTGroup
        //                    from LT in LTGroup.DefaultIfEmpty()
        //                    select new DriverDto()
        //                  {
        //                      Id = D.Id,
        //                      BrancheName = B.BranchesName,
        //                      DriverName = D.DriverName,
        //                      DriverNo = (int)(D.DriverNo != null ? D.DriverNo : 0),
        //                      LicenseEndDateH = D.LicenseEndDateH,
        //                      LicenseNo = D.LicenseNo,
        //                      LicenseReleaseDateH = D.LicenseReleaseDateH,
        //                      LicensePlace = D.LicensePlace,
        //                      LicenseTypeNameName = LT.LicenseTypeNameName,
        //                      NatName = N.NatName,
        //                      Phone = D.Phone,
        //                      MobileCode = D.MobileCode,
        //                      BrancheId = (int)(D.BranchesId != null ? D.BranchesId : 0) ,
        //                      LicenseTypeNameId = (int)(D.LicenseTypeId != null ? D.LicenseTypeId : 0) ,
        //                      NationalId = (int)(D.NationalitiesNationalId != null ? D.NationalitiesNationalId : 0) ,
        //                      LicenseEndDate = (DateTime)(D.LicenseEndDate != null ? D.LicenseEndDate : DateTime.Now),
        //                      LicenseReleaseDate = (DateTime)(D.LicenseReleaseDate != null ? D.LicenseReleaseDate : DateTime.Now) ,
        //                      Notes = D.Notes



        //                  }).Where(i => (i.BrancheId == BranchId || BranchId == null) && (i.LicenseEndDate <= EndDate || EndDate == null)).ToList();


        //    return Licence;
        //}
        public List<Owner> GetOwnerList()
        {
            return _context.Owners.ToList();
        }
        public List<Department> GetDepartMentList()
        {
            return _context.Departments.ToList();
        }

        
        //public List<DecisionAbsenceDeductionDTO> SearchListForPrint()
        //{
        //    var Licence = (from DAD in _context.DecisionAbsenceDeductions
        //                   join QE in _context.QEmployees on DAD.EmpId equals QE.EmpID
        //                   join O in _context.Owners on DAD.Owner equals O.OwnerId

        //                   select new DecisionAbsenceDeductionDTO()
        //                   {
        //                       DecisionAbsenceDeductionID = DAD.DecisionAbsenceDeductionID,
        //                       Owner = DAD.Owner,
        //                       OwnerName = O.OwnerName,
        //                       EmpId = DAD.EmpId,
        //                       EmpName = QE.EmpName,
        //                       ClassID = QE.ClassID,
        //                       ClassName = QE.ClassName,
        //                       JobName = QE.JobName,
        //                       JobLocationName = QE.JobLocationName,
        //                       DepartmentName = QE.DepartmentName,                           
        //                       DegreeID = QE.DegreeID,

        //                       Subject = DAD.Subject,
        //                       DateH = DAD.DateH,
        //                       EnclosureCount = DAD.EnclosureCount,
        //                       PublishNumber = DAD.PublishNumber,
        //                       PublishDateH = DAD.PublishDateH,
        //                       PublishedFrom = DAD.PublishedFrom,
        //                       Notes = DAD.Notes,
        //                       StartSalary = QE.StartSalary,
        //                       SalaryStartDateH = DAD.SalaryStartDateH,
        //                       Reason = DAD.Reason,
        //                       Serial = DAD.Serial,
        //                       StartDateH = DAD.StartDateH,
        //                       Approval = DAD.Approval





        //                   }).ToList();



        //    return Licence;

        //}

        //public List<DecisionAbsenceDeductionDTO> GetDecisionAbsenceDeductionForPrint(int[] ids)
        //{
        //    var List = SearchListForPrint().Where(a => ids.Contains(a.DecisionAbsenceDeductionID)).ToList();
        //    return List;
        //}


        //public int DriverHaveCar(int DriverID)
        //{
        //    var allList = _context.CarList.Where(a => a.DriverID == DriverID).ToList().OrderByDescending(a => a.Id);
        //    var Driver = allList.FirstOrDefault();

        //    if (Driver != null)
        //    {
        //        if (Driver.TrxType == 1)
        //        {

        //            return 1;

        //        }
        //        else {
        //            return 2;
        //        }
        //    }
        //    return 2;
        //}


        public EmployeeInfoDTO GetEmployeeDetailsById(int? id)
        {
          
         var  car = (from E in _context.Employees 
                   join J in _context.Jobs on E.JobID equals J.JobID
                     join D in _context.Departments on E.DepartmentID equals D.DepartmentID
                     join JL in _context.JobLocations on E.JobLocationID equals JL.JobLocationID

                     select new EmployeeInfoDTO()
                   {
                       EmpID= E.EmpID,
                       EmpName = E.EmpName,
                       JobName = J.JobName,
                       ClassID = E.ClassID,
                       DegreeID = E.DegreeID,
                       DepartmentName = D.DepartmentName,
                       JobLocationName = JL.JobLocationName,
                       ContractDateH = E.ContractDateH,



                   }

                      ).FirstOrDefault(a=>a.EmpID == id);
            return car;
        }



        public int GetMaxId()
        {
            var count = _context.DecisionAbsenceDeductions.ToList();
            var id = 0;
            if (count.Count() != 0)
            {
                id = _context.DecisionAbsenceDeductions.Max(a => a.DecisionAbsenceDeductionID);
                return id;
            }
            return id;
        }


    }
    #endregion
}

