﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HRSystem.Web.Models
{
    public class DecisionEmploymentForPrintViewModel
    {


        public int DecisionEmploymentID { get; set; }
        public string DecisionEmploymentDateH { get; set; }
        public byte DecisionEmploymentEnclosureCount { get; set; }
        public string OwnerName { get; set; }
        public string DependOn { get; set; }
        public int DecisionEmploymentEmpId { get; set; }
        public string EmpName { get; set; }
        public string ClassName { get; set; }
        public string JobName { get; set; }
        public string DepartmentName { get; set; }
        public string JobLocationName { get; set; }
        public string MonthSalary { get; set; }
        public string OnTrial { get; set; }
        public string OwnersSalaryOwnerName { get; set; }
        public string DecisionEmploymentNotes { get; set; }
        public int EmpID { get; set; }
        public string QEmployeesEmpName { get; set; }
        public short NatId { get; set; }
        public Nullable<DateTime> BirthDate { get; set; }
        public string BirthDateH { get; set; }
        public string BirthPlace { get; set; }
        public byte ReligionID { get; set; }
        public byte SocialStateID { get; set; }
        public string IDNumber { get; set; }
        public string IDPlace { get; set; }
        public Nullable<DateTime> IDDate { get; set; }
        public string IDDateH { get; set; }
        public Nullable<DateTime> IDEndDate { get; set; }
        public string IDEndDateH { get; set; }
        public Nullable<byte> ContractTypeID { get; set; }
        public string HiringNumber { get; set; }
        public DateTime ContractDate { get; set; }
        public string ContractDateH { get; set; }
        public int JobID { get; set; }
        public string InsuranceNumber { get; set; }
        public Nullable<byte> ClassID { get; set; }
        public Nullable<byte> DegreeID { get; set; }
        public decimal NatureAllow { get; set; }
        public decimal DamageAllow { get; set; }
        public decimal OtherAllow { get; set; }
        public Nullable<int> FormingNumber { get; set; }
        public Nullable<DateTime> ClassDate { get; set; }
        public string ClassDateH { get; set; }
        public Nullable<byte> JobLocationID { get; set; }
        public int DepartmentID { get; set; }
        public byte PaySlipID { get; set; }
        public bool TransToBank { get; set; }
        public Nullable<byte> BankId { get; set; }
        public string AccountNumber { get; set; }
        public Nullable<DateTime> RetirementDate { get; set; }
        public string RetirementDateH { get; set; }
        public Nullable<DateTime> PromotionDate { get; set; }
        public string PromotionDateH { get; set; }
        public Nullable<byte> CertificateID { get; set; }
        public Nullable<DateTime> CertificateDate { get; set; }
        public string CertificateDateH { get; set; }
        public string Specialization { get; set; }
        public string EducationPlace { get; set; }
        public bool StopTransAllow { get; set; }
        public bool StopSalary { get; set; }
        public bool NotActive { get; set; }
        public string NotActiveNote { get; set; }
        public bool StopInsurance { get; set; }
        public Nullable<int> CurrentDepartmentId { get; set; }
        public int AttendanceGroupId { get; set; }
        public bool NoAttendance { get; set; }
        public bool StopBankTransfer { get; set; }
        public decimal RetrievedRetirement { get; set; }
        public string Notes { get; set; }
        public string EmpNameEn { get; set; }
        public byte[] EmployeeImage { get; set; }
        public byte[] EmployeeImg { get; set; }
        public string LicenseNo { get; set; }
        public string LicensePlace { get; set; }
        public Nullable<DateTime> LicenseReleaseDate { get; set; }
        public string LicenseReleaseDateH { get; set; }
        public Nullable<DateTime> LicenseEndDate { get; set; }
        public string LicenseEndDateH { get; set; }
        public Nullable<byte> LicenseTypeId { get; set; }
        public string Phone { get; set; }
        public bool IsDriver { get; set; }
        public Nullable<byte> Type { get; set; }
        public Nullable<int> CarId { get; set; }
        public decimal EmpSalary { get; set; }
        public decimal EmpTransport { get; set; }
        public Nullable<DateTime> EmpCardEndDate { get; set; }
        public string EmpCardEndDateH { get; set; }
        public bool TempStopSalary { get; set; }
        public bool StopNatureAllow { get; set; }
        public decimal MilitaryServiceAllow { get; set; }
        public string BioStarID { get; set; }
        public Nullable<int> CurrentJobID { get; set; }
        public bool Delegated { get; set; }
        public string OldIdNO { get; set; }
        public bool Gender { get; set; }
        public string ClassificationNo { get; set; }
        public string Phone1 { get; set; }
        public string Phone2 { get; set; }
        public string Mobile1 { get; set; }
        public string Mobile2 { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Email { get; set; }
        public string MailBox { get; set; }
        public string MailCode { get; set; }
        public Nullable<short> CityId { get; set; }
        public bool StopHand { get; set; }
        public Nullable<DateTime> LastServiceDate { get; set; }
        public string LastServiceDateH { get; set; }
        public Nullable<DateTime> FixedJobDate { get; set; }
        public string FixedJobDateH { get; set; }
        public bool Legated { get; set; }
        public Nullable<short> LegatePeriod { get; set; }
        public Nullable<DateTime> LegateStart { get; set; }
        public string LegateStartH { get; set; }
        public Nullable<DateTime> LegateEnd { get; set; }
        public string LegateEndH { get; set; }
        public string LegatePlace { get; set; }
        public Nullable<bool> LegateType { get; set; }
        public string PassportNo { get; set; }
        public string PassportPlace { get; set; }
        public Nullable<DateTime> PassportDate { get; set; }
        public string PassportDateH { get; set; }
        public Nullable<DateTime> PassportEndDate { get; set; }
        public string PassportEndDateH { get; set; }
        public Nullable<DateTime> EntranceDate { get; set; }
        public string EntranceDateH { get; set; }
        public Nullable<int> MinistryNo { get; set; }
        public Nullable<DateTime> BirthDateG { get; set; }
        public string BirthDateGH { get; set; }
        public bool StopSupportDeduct { get; set; }
        public bool StopHighCostAllow { get; set; }
        public string MobileCCode { get; set; }
        public bool StopRetirement { get; set; }
        public bool ChargedEmp { get; set; }
        public Nullable<int> ChargedEmpId { get; set; }
        public string ChargedEmpAccountNo { get; set; }
        public string StopSalaryReason { get; set; }
        public decimal Bonus { get; set; }
        public decimal HealthInsurance { get; set; }
        public Nullable<DateTime> StartDate { get; set; }
        public string StartDateH { get; set; }
        public bool Outsider { get; set; }
        public string OutsiderLegationLocation { get; set; }
        public string RetirementAcc { get; set; }
        public string RetrievedRetirementAccountNumber { get; set; }
        public decimal OtherDeduct { get; set; }
        public Nullable<byte> ChargedEmpBankID { get; set; }
        public string TransactionCode { get; set; }
        public string TermCode { get; set; }
        public string EmpSatusCode { get; set; }
        public Nullable<DateTime> TermDate { get; set; }
        public string TermDateH { get; set; }
        public Nullable<short> MajorCode { get; set; }
        public Nullable<short> UniversityCode { get; set; }
        public Nullable<byte> Grade { get; set; }
        public Nullable<int> StartJobId { get; set; }
        public string EltezamResponse { get; set; }
        public string EltezamResponseQlf { get; set; }
        public Nullable<DateTime> OtherDeductDate { get; set; }
        public Nullable<decimal> StartSalary { get; set; }
        public string ClassName1 { get; set; }
        public string SocialStateName { get; set; }
        public string JobName1 { get; set; }
        public string PaySlipTypeName { get; set; }
        public string PaySlipName { get; set; }
        public Nullable<decimal> TransportAllow { get; set; }
        public string NatName { get; set; }
        public string ReligionName { get; set; }
        public string DepartmentName1 { get; set; }
        public string JobLocationName1 { get; set; }
        public string ContractTypeName { get; set; }
        public string BankName { get; set; }
        public string ShortName { get; set; }
        public string CertificateName { get; set; }
        public string CurrentDepartmentName { get; set; }
        public string AttendanceGroupName { get; set; }
        public Nullable<DateTime> FromHour { get; set; }
        public Nullable<DateTime> ToHour { get; set; }
        public string CurrentJobName { get; set; }
        public Nullable<bool> IsSaudi { get; set; }
        public string StartJobName { get; set; }
    }
}