import { CheckCircle } from 'lucide-react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import * as React from 'react';

import TypographyAlert from '@/components/alert/TypographyAlert';
import withAuth from '@/components/hoc/withAuth';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import PageHeader from '@/components/layout/dashboard/PageHeader';
import Seo from '@/components/Seo';

import useAjuanStore from '@/store/useAjuanStore';

import { AjuanDataType } from '@/content/ajuan';
import DocumentDetailCard from '@/pages/pendampingan/components/DocumentDetailCard';
import ProductDetailCard from '@/pages/pendampingan/components/ProductDetailCard';
import ShopDetailCard from '@/pages/pendampingan/components/ShopDetailCard';

export default withAuth('protected')(AjuanPage);
function AjuanPage({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const data = useAjuanStore
    .useData()
    .find((a) => a.id === +id) as AjuanDataType;
  return (
    <DashboardLayout className='relative'>
      <Seo templateTitle='Detail Pendampingan Sertifikasi' />

      <main className='py-12 flex flex-col gap-8'>
        <PageHeader
          className='z-10'
          backHref='/pendampingan'
          crumbs={['/dashboard', '/pendampingan', '/id']}
        >
          <PageHeader.Title>{data.nama}</PageHeader.Title>
        </PageHeader>

        <section className='flex flex-col gap-6 z-10'>
          {data.status === 'completed' && (
            <div className='dashboard-layout'>
              <TypographyAlert variant='success' leftIcon={CheckCircle}>
                <p>Yeay, pendampingan yang anda lakukan telah selesai 🎉 </p>
              </TypographyAlert>
            </div>
          )}

          <ShopDetailCard data={data} />

          <ProductDetailCard data={data} />

          <DocumentDetailCard data={data.dokumen} />
        </section>

        <div
          className='absolute inset-0 opacity-50'
          style={{
            backgroundImage: 'url("/images/background/grid.png")',
          }}
        >
          <div className='from-transparent to-light absolute inset-0 bg-gradient-to-b  bg-repeat' />
        </div>
      </main>
    </DashboardLayout>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const id = context.params?.id;
  if (typeof id !== 'string') {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id,
    },
  };
};
