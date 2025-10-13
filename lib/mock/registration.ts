export type VerificationPayload = {
  firstName: string
  middleName?: string
  lastName: string
  studentId: string
  graduationYear: string
  institution: string
}

export type EligibleGraduate = VerificationPayload & {
  email: string
}

export type VerificationResult =
  | { status: "matched"; graduate: EligibleGraduate }
  | { status: "not_found" }

export type ManualReviewResult = { status: "submitted" }
export type AccountCreationPayload = { email: string; password: string }
export type AccountCreationResult = { status: "created" }

const eligibleGraduates: EligibleGraduate[] = [
  {
    firstName: "Aminata",
    middleName: "",
    lastName: "Kamara",
    studentId: "COMAHS-2024-1032",
    graduationYear: "2024",
    institution: "College of Medicine and Allied Health Sciences (COMAHS)",
    email: "aminata.kamara@example.com",
  },
  {
    firstName: "Joseph",
    middleName: "Sullay",
    lastName: "Koroma",
    studentId: "NU-SCHS-2023-0456",
    graduationYear: "2023",
    institution: "Njala University - School of Community Health Sciences",
    email: "joseph.koroma@example.com",
  },
  {
    firstName: "Fatmata",
    middleName: "",
    lastName: "Sesay",
    studentId: "USL-NUR-2025-0876",
    graduationYear: "2025",
    institution: "University of Sierra Leone - Faculty of Nursing",
    email: "fatmata.sesay@example.com",
  },
]

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })

const normalize = (value: string) => value.trim().toLowerCase()

export async function mockVerifyApplicant(
  payload: VerificationPayload
): Promise<VerificationResult> {
  await delay(650)

  const match = eligibleGraduates.find((graduate) => {
    const matchesNames =
      normalize(graduate.firstName) === normalize(payload.firstName) &&
      normalize(graduate.lastName) === normalize(payload.lastName) &&
      normalize(graduate.middleName ?? "") === normalize(payload.middleName ?? "")

    const matchesIds =
      normalize(graduate.studentId) === normalize(payload.studentId) &&
      graduate.graduationYear === payload.graduationYear &&
      graduate.institution === payload.institution

    return matchesNames && matchesIds
  })

  if (!match) {
    return { status: "not_found" }
  }

  return { status: "matched", graduate: match }
}

export async function mockSubmitManualReview(
  payload: VerificationPayload
): Promise<ManualReviewResult> {
  await delay(900)
  console.info("Manual review request submitted (mock):", payload)
  return { status: "submitted" }
}

export async function mockCreateAccount(
  payload: AccountCreationPayload
): Promise<AccountCreationResult> {
  await delay(900)
  console.info("Mock account created:", payload.email)
  return { status: "created" }
}

export type { EligibleGraduate as MockEligibleGraduate }
