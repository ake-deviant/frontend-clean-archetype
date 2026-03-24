import { GetUserPresenter } from '../../../presentation/user/get-user.presenter';
import { GetUserResponse } from '../../../application/use-cases/get-user/get-user.dto';

const mockResponse: GetUserResponse = {
  id: '1',
  name: 'Alice Dupont',
  email: 'alice@example.com',
};

describe('GetUserPresenter', () => {
  let presenter: GetUserPresenter;

  beforeEach(() => {
    presenter = new GetUserPresenter();
  });

  describe('present', () => {
    it('should map all fields to the ViewModel', () => {
      const viewModel = presenter.present(mockResponse);

      expect(viewModel.id).toBe('1');
      expect(viewModel.fullName).toBe('Alice Dupont');
      expect(viewModel.email).toBe('alice@example.com');
    });

    it('should format displayLabel as "name <email>"', () => {
      const viewModel = presenter.present(mockResponse);

      expect(viewModel.displayLabel).toBe('Alice Dupont <alice@example.com>');
    });
  });
});
