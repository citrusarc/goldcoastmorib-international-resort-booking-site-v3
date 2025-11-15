"use client";

import { cormorantGaramond } from "@/config/fonts";

export default function RefundPolicyPage() {
  return (
    <article className="flex p-4 sm:p-8 items-center justify-center">
      <div className="flex flex-col gap-8 w-full max-w-6xl">
        <h1
          className={`text-3xl sm:text-4xl font-semibold ${cormorantGaramond.className} text-amber-500`}
        >
          Refund Policy
        </h1>

        <p className="text-zinc-500">
          Our refund policy outlines the procedures and conditions under which
          customers may request refunds for services or bookings made through
          our website. We aim to provide a clear and fair policy to ensure a
          smooth process for all our guests while maintaining the quality and
          reliability of our services.
        </p>

        <div>
          <h2 className="text-lg font-semibold text-zinc-800">
            Eligibility for Refunds
          </h2>
          <p className="text-zinc-500">
            Refunds may be requested in cases of booking cancellations, changes
            in services, or errors in billing. To be eligible for a refund, the
            request must be submitted within the stipulated time frame outlined
            during booking. Refunds will not be granted in cases where the terms
            and conditions of the booking explicitly state that refunds are not
            allowed.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-800">
            Cancellation Procedure
          </h2>
          <p className="text-zinc-500">
            To cancel a booking and request a refund, customers must contact our
            customer service team via email or the booking portal. Requests
            should include booking details and the reason for cancellation. Once
            the request is received, our team will review the eligibility and
            notify you of the outcome within a reasonable period.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-800">
            Refund Timeline
          </h2>
          <p className="text-zinc-500">
            Approved refunds will be processed within 7-14 business days from
            the date of approval. The refunded amount will be returned via the
            original payment method. Please note that bank processing times may
            vary, and we are not responsible for delays caused by financial
            institutions.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-800">
            Partial Refunds
          </h2>
          <p className="text-zinc-500">
            In some cases, partial refunds may be issued based on the
            circumstances of the cancellation or service usage. This includes
            situations where a service has been partially utilized or if a
            cancellation is made outside the standard refund window.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-800">
            Non-Refundable Charges
          </h2>
          <p className="text-zinc-500">
            Certain fees, including processing fees, service charges, or
            third-party charges, may be non-refundable. These will be
            communicated during the booking process, and customers should review
            these terms carefully before making a reservation.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-800">
            Contact Information
          </h2>
          <p className="text-zinc-500">
            For any questions or requests regarding refunds, please contact our
            customer service team at support@goldcoastmorib.com. Our team is
            available to assist you and ensure your concerns are addressed
            promptly.
          </p>
        </div>
      </div>
    </article>
  );
}
