import { GetAllUsersPresenter } from '../../../presentation/user/get-all-users.presenter';
import { GetAllUsersResponse } from '../../../application/use-cases/get-all-users/get-all-users.dto';

const mockResponse: GetAllUsersResponse = [
  { id: '1', name: 'Alice Dupont', email: 'alice@example.com' },
  { id: '2', name: 'Bob Martin', email: 'bob@example.com' },
];

describe('GetAllUsersPresenter', () => {
  let presenter: GetAllUsersPresenter;

  beforeEach(() => {
    presenter = new GetAllUsersPresenter();
  });

  describe('present', () => {
    it('should map all users to ViewModels', () => {
      const viewModels = presenter.present(mockResponse);

      expect(viewModels).toHaveLength(2);
      expect(viewModels[0]).toEqual({
        id: '1',
        fullName: 'Alice Dupont',
        email: 'alice@example.com',
        displayLabel: 'Alice Dupont <alice@example.com>',
      });
    });

    it('should return an empty array when response is empty', () => {
      const viewModels = presenter.present([]);

      expect(viewModels).toHaveLength(0);
    });
  });
});
